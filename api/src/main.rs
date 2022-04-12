use actix_web::{
    web::{scope, Data, ServiceConfig},
    App, HttpServer,
};

use std::path::Path;

mod api;
mod db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let env_path = Path::new("/etc/wc-api/.env");
    dotenv::from_path(env_path).unwrap();

    let pool = db::connection_builder().await.unwrap();
    let pool_data = Data::new(pool);

    HttpServer::new(move || {
        App::new()
            .app_data(Data::clone(&pool_data))
            .configure(|cfg: &mut ServiceConfig| {
                cfg.service(scope("/api/v1").configure(api::v1::register_urls));
            })
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}
