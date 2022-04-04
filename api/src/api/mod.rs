use actix_web::{self,web};

mod references;
mod modules;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/api/references").configure(references::register_urls));
    cfg.service(web::scope("/api/modules").configure(modules::register_urls));
}
