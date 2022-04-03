use actix_web::{web::Data, App, HttpServer};
use dotenv;
use std::path::Path;

mod api;
mod db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let env_path = Path::new("/ect/wc-api/.env");
    dotenv::from_path(env_path).ok();

    //let pool = db::connection_builder().await.unwrap();

    HttpServer::new(move || {
        App::new()
 //           .app_data(Data::new(pool.clone()))
            .configure(api::register_urls)
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}
