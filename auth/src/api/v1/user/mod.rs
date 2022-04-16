use actix_web::{self, web};

pub mod controllers;
pub mod models;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.route("/login", web::post().to(controllers::login));
    cfg.route("/login/", web::post().to(controllers::login));
    cfg.route("/create", web::post().to(controllers::create));
    cfg.route("/create/", web::post().to(controllers::create));
    cfg.route("/delete", web::post().to(controllers::delete));
    cfg.route("/delete/", web::post().to(controllers::delete));
}
