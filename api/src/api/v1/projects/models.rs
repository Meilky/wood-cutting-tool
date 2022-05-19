use serde::{Deserialize, Serialize};
use sqlx::Row;

use crate::db::DBRow;

#[derive(Deserialize, Serialize)]
pub struct Project {
    id: i32,
    user_id: i32,
    name: String,
}

impl Project {
    pub fn from_row(row: DBRow) -> Self {
        Project {
            id: row.get::<i32, &str>("id"),
            user_id: row.get::<i32, &str>("user_id"),
            name: row.get::<String, &str>("name"),
        }
    }
}

#[derive(Deserialize, Serialize)]
pub struct Plank {
    id: i32,
    project_id: i32,
    name: String,
    width: i32,
    height: i32,
}

impl Plank {
    pub fn from_row(row: DBRow) -> Self {
        Plank {
            id: row.get::<i32, &str>("id"),
            project_id: row.get::<i32, &str>("project_id"),
            name: row.get::<String, &str>("name"),
            width: row.get::<i32, &str>("width"),
            height: row.get::<i32, &str>("height"),
        }
    }
}
