use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use dotenv;
use std::path::Path;


async fn auth() -> impl Responder {
    HttpResponse::Ok().body("Hello from auth!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let env_path = Path::new("/etc/wc-auth/.env");
    dotenv::from_path(env_path).ok();

    HttpServer::new(|| {
        App::new()
            .route("/auth", web::get().to(auth))
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}

