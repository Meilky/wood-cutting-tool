use sqlx::mysql::MySqlPool;
use std::env;

pub type DbPool = sqlx::mysql::MySqlPool;

pub async fn connection_builder() -> Result<DbPool, sqlx::Error> {
    let connection_url = format!(
        "mysql://{}:{}@{}/{}",
        env::var("DB_USER").unwrap(),
        env::var("DB_PASSWORD").unwrap(),
        env::var("DB_HOST").unwrap(),
        env::var("DB_NAME").unwrap()
    );

    MySqlPool::connect(&connection_url.as_str()).await
}
