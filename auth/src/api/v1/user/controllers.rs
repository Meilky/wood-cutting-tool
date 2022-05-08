use crate::db::DBPool;
use actix_web::web::{Data, Json};
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

pub async fn login(
    info: Json<Info>,
    pool: Data<DBPool>,
    auth_middleware: Data<AuthMiddleware>,
) -> Json<LoginRes> {
    let inner = info.into_inner();

    let row =
        sqlx::query("SELECT * FROM `users` WHERE (username=? OR email=?) AND password_hash=?;")
            .bind(&inner.username_or_email)
            .bind(&inner.username_or_email)
            .bind(&inner.password)
            .fetch_one(pool.get_ref())
            .await
            .unwrap();
    let user: User = User::from_row(row);

    let token = auth_middleware.get_ref().encode(&user);

    Json(LoginRes { token })
}

#[derive(Deserialize, Serialize)]
pub struct CreateRes {
    msg: String,
}

pub async fn create(
    info: Json<Info>,
    pool: Data<DBPool>,
    _auth_middleware: Data<AuthMiddleware>,
) -> Json<CreateRes> {
    let inner = info.into_inner();

    let row = sqlx::query("SELECT * FROM `users` WHERE (username=? OR email=?);")
        .bind(&inner.username_or_email)
        .fetch_all(pool.get_ref())
        .await
        .unwrap();

    if !row.is_empty() {
        return Json(CreateRes {
            msg: "User already exist".to_string(),
        });
    }

    Json(CreateRes {
        msg: "User doenst exist".to_string(),
    })
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
