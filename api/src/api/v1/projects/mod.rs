use actix_web::{self, web};

mod controllers;
pub mod models;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.route("", web::post().to(controllers::get_projects));
    cfg.route("/", web::post().to(controllers::get_projects));
    cfg.route("/planks", web::post().to(controllers::get_planks));
    cfg.route("/planks/", web::post().to(controllers::get_planks));
}
