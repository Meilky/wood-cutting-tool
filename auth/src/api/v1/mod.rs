
use actix_web::{self,web};

mod user;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/user").configure(user::register_urls));
}
