use actix_web::{self, web};

mod controllers;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.route("", web::get().to(controllers::get_references));
    cfg.route("/", web::get().to(controllers::get_references));
    cfg.route("/{id}", web::get().to(controllers::get_reference));
}
