use crate::db::{DBPool, DBRow};
use actix_web::web::{Data, Json, Path};
use serde::{Deserialize, Serialize};
use sqlx::Row;

#[derive(Deserialize, Serialize)]
pub struct Module {
    id: i32,
    name: String,
    origin: String,
}

impl Module {
    pub fn from_row(row: DBRow) -> Self {
        Module {
            id: row.get::<i32, &str>("id"),
            name: row.get::<String, &str>("name"),
            origin: row.get::<String, &str>("origin"),
        }
    }
}

pub async fn get_modules(pool: Data<DBPool>) -> Json<Vec<Module>> {
    let data = sqlx::query("SELECT * FROM `modules`;")
        .fetch_all(pool.get_ref())
        .await
        .unwrap();

    let mut modules: Vec<Module> = vec![];

    for row in data {
        modules.push(Module::from_row(row));
    }

    Json(modules)
}

pub async fn get_module(pool: Data<DBPool>, id: Path<u32>) -> Json<Module> {
    let data = sqlx::query("SELECT * FROM `modules` WHERE id=?;")
        .bind(id.into_inner())
        .fetch_one(pool.get_ref())
        .await
        .unwrap();

    Json(Module::from_row(data))
}
