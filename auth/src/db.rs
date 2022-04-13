use sqlx::mysql::MySqlPool;
use dotenv;

pub type DBPool = sqlx::mysql::MySqlPool;
pub type DBRow = sqlx::mysql::MySqlRow;

pub async fn connection_builder() -> Result<DBPool, sqlx::Error> {
    let connection_url = format!(
        "mysql://{}:{}@{}/{}",
        dotenv::var("DB_USER").unwrap(),
        dotenv::var("DB_PASSWORD").unwrap(),
        dotenv::var("DB_HOST").unwrap(),
        dotenv::var("DB_NAME").unwrap()
    );

    MySqlPool::connect(connection_url.as_str()).await
}
