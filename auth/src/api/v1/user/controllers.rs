use crate::db::DBPool;
use actix_web::web::{Data, Json};
use serde::{Deserialize, Serialize};

use crate::api::v1::middlewares::auth_middleware::AuthMiddleware;
use crate::api::v1::middlewares::auth_middleware::AuthMiddlewareTrait;
use crate::api::v1::user::models::User;

#[derive(Deserialize, Serialize)]
pub struct Info {
    username: String,
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

    let row = sqlx::query("SELECT * FROM `users` WHERE username=? AND password_hash=?;")
        .bind(&inner.username)
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

pub async fn create(_pool: Data<DBPool>) -> Json<CreateRes> {
    Json(CreateRes {
        msg: "create working".to_string(),
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
