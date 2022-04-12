use crate::db::{DBPool, DBRow};
use actix_web::web::{Data, Json, Path};
use serde::{Deserialize, Serialize};
use sqlx::Row;

#[derive(Deserialize, Serialize)]
pub struct Reference {
    id: i32,
    name: String,
    description: String,
    link: String,
}

impl Reference {
    pub fn from_row(row: DBRow) -> Self {
        Reference {
            id: row.get::<i32, &str>("id"),
            name: row.get::<String, &str>("name"),
            description: row.get::<String, &str>("description"),
            link: row.get::<String, &str>("link"),
        }
    }
}

pub async fn get_references(pool: Data<DBPool>) -> Json<Vec<Reference>> {
    let data = sqlx::query("SELECT * FROM `references`;")
        .fetch_all(pool.get_ref())
        .await
        .unwrap();

    let mut references = vec![];

    for reference in data {
        references.push(Reference::from_row(reference));
    }

    Json(references)
}

pub async fn get_reference(pool: Data<DBPool>, id: Path<i32>) -> Json<Reference> {
    let data = sqlx::query("SELECT * FROM `references` WHERE id=?;")
        .bind(id.into_inner())
        .fetch_one(pool.get_ref())
        .await
        .unwrap();

    Json(Reference::from_row(data))
}
