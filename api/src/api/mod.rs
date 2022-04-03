use actix_web::{self,web};

pub mod references;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/api/references").configure(references::register_urls));
}
