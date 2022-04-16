use crate::{
    db::{DBPool, DBRow},
    middlewares::auth_middleware::AuthMiddleware,
};
use actix_web::web::{Data, Json};
use serde::{Deserialize, Serialize};
use sqlx::Row;

#[derive(Deserialize, Serialize)]
pub struct PlankType {
    id: i32,
    name: String,
    x: i32,
    y: i32,
}

impl PlankType {
    pub fn from_row(row: DBRow) -> Self {
        PlankType {
            id: row.get::<i32, &str>("id"),
            name: row.get::<String, &str>("name"),
            x: row.get::<i32, &str>("x"),
            y: row.get::<i32, &str>("y"),
        }
    }
}

#[derive(Deserialize)]
pub struct Info {
    token: String,
}

pub async fn get_planks(
    info: Json<Info>,
    pool: Data<DBPool>,
    auth_middleware: Data<AuthMiddleware>,
) -> Json<Vec<PlankType>> {

    auth_middleware.get_ref().parse(&info.token);

    let data = sqlx::query("SELECT * FROM `plank_types`;")
        .fetch_all(pool.get_ref())
        .await
        .unwrap();

    let mut modules: Vec<PlankType> = vec![];

    for row in data {
        modules.push(PlankType::from_row(row));
    }

    Json(modules)
}
