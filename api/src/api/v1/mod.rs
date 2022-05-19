use actix_web::{self,web};

mod references;
mod modules;
mod projects;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/references").configure(references::register_urls));
    cfg.service(web::scope("/modules").configure(modules::register_urls));
    cfg.service(web::scope("/projects").configure(projects::register_urls));
}
