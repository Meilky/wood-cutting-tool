use actix_web::{self, web};

mod urls;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/references").to(urls::get_references));
}
