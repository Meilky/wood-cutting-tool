use crate::api::v1::middlewares::encrypt_middleware::{EncryptMiddleware, EncryptMiddlewareTrait};
use crate::db::DBPool;
use actix_web::http::header::ContentType;
use actix_web::http::StatusCode;
use actix_web::web::{Data, Json};
use actix_web::{HttpRequest, HttpResponse};
use chrono::prelude::*;
use cookie::Cookie;
use rand::distributions::Alphanumeric;
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};
use sqlx::Row;

use crate::api::v1::middlewares::auth_middleware::AuthMiddleware;
use crate::api::v1::middlewares::auth_middleware::AuthMiddlewareTrait;
use crate::api::v1::user::models::{TokenInnerData, User};

#[derive(Deserialize, Serialize)]
pub struct LoginInfo {
    username_or_email: String,
    password: String,
}

#[derive(Deserialize, Serialize)]
pub struct LoginResponse {
    fingerprint: String,
}

#[derive(Deserialize, Serialize)]
pub struct InfoInfo {
    fingerprint: String,
}

#[derive(Deserialize, Serialize)]
pub struct InfoResponse {
    username: String,
    email: String,
}

pub async fn info(req: HttpRequest, info: Json<InfoInfo>) -> HttpResponse {
    let pool = req.app_data::<Data<DBPool>>().unwrap();
    let auth_mid = req.app_data::<Data<AuthMiddleware>>().unwrap();

    let token = match req.cookie("token") {
        None => {
            return HttpResponse::build(StatusCode::BAD_REQUEST)
                .content_type(ContentType::plaintext())
                .body("No token provided in cookies!");
        }
        Some(t) => t,
    };

    let token_data: TokenInnerData = match auth_mid.get_ref().parse(&token.value().to_string()) {
        Ok(data) => data.claims,
        Err(e) => {
            return HttpResponse::build(StatusCode::BAD_REQUEST)
                .content_type(ContentType::plaintext())
                .body(e.to_string());
        }
    };

    if !(token_data.fingerprint == info.fingerprint) {
        return HttpResponse::build(StatusCode::BAD_REQUEST)
            .content_type(ContentType::plaintext())
            .body("Fingerprint from the token isn't the same from the provided fingerprint!");
    }

    let raw_row = sqlx::query("SELECT * FROM `users` WHERE id=?;")
        .bind(&token_data.user_id)
        .fetch_one(pool.get_ref())
        .await;

    if let Err(err) = raw_row {
        return HttpResponse::build(StatusCode::BAD_REQUEST)
            .content_type(ContentType::plaintext())
            .body(err.to_string());
    }

    let row = raw_row.unwrap();

    HttpResponse::build(StatusCode::OK)
        .content_type(ContentType::plaintext())
        .body(
            serde_json::to_string(&InfoResponse {
                username: row.get::<String, &str>("username"),
                email: row.get::<String, &str>("email"),
            })
            .unwrap(),
        )
}

pub async fn login(req: HttpRequest, info: Json<LoginInfo>) -> HttpResponse {
    let inner = info.into_inner();

    let pool = req.app_data::<Data<DBPool>>().unwrap();
    let auth_mid = req.app_data::<Data<AuthMiddleware>>().unwrap();
    let encrypt_mid = req.app_data::<Data<EncryptMiddleware>>().unwrap();

    let row = sqlx::query("SELECT * FROM `users` WHERE username=? OR email=?;")
        .bind(&inner.username_or_email)
        .bind(&inner.username_or_email)
        .fetch_one(pool.get_ref())
        .await;

    if let Err(err) = row {
        return HttpResponse::build(StatusCode::BAD_REQUEST)
            .content_type(ContentType::plaintext())
            .body(err.to_string());
    }

    let user: User = User::from_row(row.unwrap());

    if encrypt_mid.check(&inner.password.as_bytes(), &user.password_hash) {
        let rng = thread_rng();

        let fingerprint: String = rng
            .sample_iter(&Alphanumeric)
            .take(16)
            .map(char::from)
            .collect();

        let now: DateTime<Utc> = Utc::now();
        let iat: i64 = now.timestamp();
        let exp: i64 = iat + (60 * 60);
        let token_data = TokenInnerData {
            exp,
            iat,
            user_id: user.id,
            fingerprint: fingerprint.clone(),
        };

        let token = auth_mid.get_ref().encode(&token_data);

        return HttpResponse::build(StatusCode::OK)
            .cookie(
                Cookie::build("token", token)
                    .path("/")
                    .secure(true)
                    .http_only(true)
                    .finish(),
            )
            .body(serde_json::to_string(&LoginResponse { fingerprint }).unwrap());
    }

    HttpResponse::build(StatusCode::BAD_REQUEST).body("Wrong password!")
}

#[derive(Deserialize, Serialize)]
pub struct CreateRes {
    msg: String,
}

#[derive(Deserialize, Serialize)]
pub struct CreateReq {
    username: String,
    email: String,
    password: String,
}

pub async fn create(req: HttpRequest, body: Json<CreateReq>) -> HttpResponse {
    let data = body.into_inner();

    let _cookies = req.cookies().unwrap();
    let encrypt_mid = req.app_data::<Data<EncryptMiddleware>>().unwrap();
    let pool = req.app_data::<Data<DBPool>>().unwrap();

    let row = sqlx::query("SELECT * FROM `users` WHERE (username=? OR email=?);")
        .bind(&data.username)
        .bind(&data.email)
        .fetch_all(pool.get_ref())
        .await
        .unwrap();

    if !row.is_empty() {
        return HttpResponse::build(StatusCode::BAD_REQUEST)
            .content_type(ContentType::plaintext())
            .body("User already exist!");
    }

    let mut rng = thread_rng();
    let hash = encrypt_mid
        .get_ref()
        .encrypt(&data.password.as_bytes(), &rng.gen::<[u8; 32]>());

    sqlx::query("INSERT INTO users VALUES (null, ?, ?, ?);")
        .bind(&data.username)
        .bind(&data.email)
        .bind(&hash)
        .execute(pool.get_ref())
        .await
        .unwrap();

    HttpResponse::Ok().finish()
}

#[derive(Deserialize, Serialize)]
pub struct DeleteRes {
    msg: String,
}

pub async fn delete(_pool: Data<DBPool>) -> Json<DeleteRes> {
    Json(DeleteRes {
        msg: "delete working".to_string(),
    })
}
