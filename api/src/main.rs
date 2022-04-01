use actix_web::{App, HttpServer};
use dotenv;
use std::path::Path;

mod api;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let env_path = Path::new("/ect/wc-api/.env");
    dotenv::from_path(env_path).ok();

    HttpServer::new(|| {
        App::new().configure(api::register_urls)
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}

