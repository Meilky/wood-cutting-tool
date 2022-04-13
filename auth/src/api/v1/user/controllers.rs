use crate::db::DBPool;
//use crate::db::{DBPool, DBRow};
use actix_web::web::{Data, Json};
//use actix_web::web::{Data, Json, Path};
use serde::{Deserialize, Serialize};
//use sqlx::Row;

#[derive(Deserialize,Serialize)]
pub struct Test {
    msg: String,
}

pub async fn login(_pool: Data<DBPool>) -> Json<Test> {
    Json(Test {
        msg: "login working".to_string()
    })
}

pub async fn create(_pool: Data<DBPool>) -> Json<Test> {
    Json(Test {
        msg: "create working".to_string()
    })
}

pub async fn delete(_pool: Data<DBPool>) -> Json<Test> {
    Json(Test {
        msg: "delete working".to_string()
    })
}
