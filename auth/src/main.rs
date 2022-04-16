use actix_web::{
    web::{scope, Data, ServiceConfig},
    App, HttpServer,
};
use jsonwebtoken::{Algorithm, DecodingKey, EncodingKey, Header};
use std::{fs, path::Path};

mod api;
mod db;

use api::v1::middlewares::auth_middleware::AuthMiddleware;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let env_path = Path::new("/etc/wc-auth/.env");
    dotenv::from_path(env_path).unwrap();

    let pub_key_path = Path::new("/etc/wc-auth/public-key.pem");
    let pri_key_path = Path::new("/etc/wc-auth/private-key.pem");

    let pub_key = fs::read_to_string(pub_key_path).expect("Couldn't read public key file!");
    let pri_key = fs::read_to_string(pri_key_path).expect("Couldn't read public key file!");

    let auth_mid: AuthMiddleware = AuthMiddleware::new(
        DecodingKey::from_rsa_pem(pub_key.as_bytes()).unwrap(),
        EncodingKey::from_rsa_pem(pri_key.as_bytes()).unwrap(),
        Header::new(Algorithm::RS256),
    );

    let pool = db::connection_builder().await.unwrap();
    let pool_data = Data::new(pool);
    let auth_mid_data = Data::new(auth_mid);

    HttpServer::new(move || {
        App::new()
            .app_data(Data::clone(&pool_data))
            .app_data(Data::clone(&auth_mid_data))
            .configure(|cfg: &mut ServiceConfig| {
                cfg.service(scope("/auth/v1").configure(api::v1::register_urls));
            })
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}
