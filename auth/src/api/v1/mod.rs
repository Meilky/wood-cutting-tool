use actix_web::{self,web};

pub mod user;
pub mod middlewares;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/user").configure(user::register_urls));
}
