use actix_web::{self, web};

mod controllers;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.route("", web::get().to(controllers::get_planks));
    cfg.route("/", web::get().to(controllers::get_planks));
}
