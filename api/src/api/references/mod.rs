use actix_web::{self, web};

mod urls;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.route("", web::get().to(urls::get_references));
}