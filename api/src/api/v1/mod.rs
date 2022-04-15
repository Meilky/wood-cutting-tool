use actix_web::{self,web};

mod references;
mod modules;
mod plank_types;

pub fn register_urls(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/references").configure(references::register_urls));
    cfg.service(web::scope("/modules").configure(modules::register_urls));
    cfg.service(web::scope("/plank_types").configure(plank_types::register_urls));
}
