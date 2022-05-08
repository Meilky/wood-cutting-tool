use serde::{Deserialize, Serialize};
use sqlx::Row;

use crate::db::DBRow;

#[derive(Deserialize, Serialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password_hash: String,
}

impl User {
    pub fn from_row(row: DBRow) -> Self {
        User {
            id: row.get::<i32, &str>("id"),
            username: row.get::<String, &str>("username"),
            email: row.get::<String, &str>("email"),
            password_hash: row.get::<String, &str>("password_hash"),
        }
    }
}
