use actix_web::{self, web};

mod controllers;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.route("", web::get().to(controllers::get_modules));
    cfg.route("/", web::get().to(controllers::get_modules));
    cfg.route("/{id}", web::get().to(controllers::get_module));
}
