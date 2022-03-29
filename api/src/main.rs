use actix_web::{web, App, HttpResponse, HttpServer, Responder,middleware::Logger};
use dotenv;
use std::path::Path;

async fn api() -> impl Responder {
    HttpResponse::Ok().body("Hello from api!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::from_path(env_path).ok();

    HttpServer::new(|| {
        App::new()
            .route("/api", web::get().to(api))
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}

