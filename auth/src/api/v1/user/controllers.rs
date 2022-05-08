use crate::api::v1::middlewares::encrypt_middleware::{EncryptMiddleware, EncryptMiddlewareTrait};
use crate::db::DBPool;
use actix_web::http::header::ContentType;
use actix_web::http::StatusCode;
use actix_web::web::{Data, Json};
use actix_web::{HttpRequest, HttpResponse};
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};

use crate::api::v1::middlewares::auth_middleware::AuthMiddleware;
use crate::api::v1::middlewares::auth_middleware::AuthMiddlewareTrait;
use crate::api::v1::user::models::User;

#[derive(Deserialize, Serialize)]
pub struct Info {
    username_or_email: String,
    password: String,
}

#[derive(Deserialize, Serialize)]
pub struct LoginRes {
    token: String,
}

pub async fn login(req: HttpRequest, info: Json<Info>) -> Json<LoginRes> {
    let inner = info.into_inner();

    let pool = req.app_data::<Data<DBPool>>().unwrap();
    let auth_mid = req.app_data::<Data<AuthMiddleware>>().unwrap();
    let encrypt_mid = req.app_data::<Data<EncryptMiddleware>>().unwrap();

    let row = sqlx::query("SELECT * FROM `users` WHERE username=? OR email=?;")
        .bind(&inner.username_or_email)
        .bind(&inner.username_or_email)
        .fetch_one(pool.get_ref())
        .await
        .unwrap();
    let user: User = User::from_row(row);

    if encrypt_mid.check(&inner.password.as_bytes(), &user.password_hash) {
        let token = auth_mid.get_ref().encode(&user);

        return Json(LoginRes { token });
    }

    Json(LoginRes { token: "kdasjfldjkl".to_owned() })
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
            .content_type(ContentType::json())
            .body(
                serde_json::to_string(&CreateRes {
                    msg: "User already exist".to_string(),
                })
                .unwrap(),
            );
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
