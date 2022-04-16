use actix_web::{
    web::{scope, Data, ServiceConfig},
    App, HttpServer,
};
use jsonwebtoken::DecodingKey;

use std::{fs, path::Path};

mod api;
mod db;
mod middlewares;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let env_path = Path::new("/etc/wc-api/.env");
    dotenv::from_path(env_path).unwrap();

    let pub_key_path = Path::new("/etc/wc-api/public-key.pem");
    let pub_key = fs::read_to_string(pub_key_path).expect("Couldn't read public key file!");

    let pool = db::connection_builder().await.unwrap();
    let auth_mid = middlewares::auth_middleware::AuthMiddleware::new(DecodingKey::from_rsa_pem(pub_key.as_bytes()).unwrap());

    let pool_data = Data::new(pool);
    let auth_mid_data = Data::new(auth_mid);

    HttpServer::new(move || {
        App::new()
            .app_data(Data::clone(&pool_data))
            .app_data(Data::clone(&auth_mid_data))
            .configure(|cfg: &mut ServiceConfig| {
                cfg.service(scope("/api/v1").configure(api::v1::register_urls));
            })
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}
