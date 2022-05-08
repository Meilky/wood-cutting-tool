use argon2::{self, Config};

pub struct EncryptMiddleware<'a> {
    config: Config<'a>,
}

pub trait EncryptMiddlewareTrait {
    fn check(&self, password: &[u8], hash: &String) -> bool;
    fn encrypt(&self, password: &[u8], salt: &[u8]) -> String;
}

impl EncryptMiddleware<'_>{
    pub fn new(config: Config<'static>) -> Self {
        EncryptMiddleware { config }
    }
}

impl EncryptMiddlewareTrait for EncryptMiddleware<'_>{
    fn check(&self, password: &[u8], hash: &String) -> bool {
        argon2::verify_encoded(&hash, password).unwrap()
    }
    fn encrypt(&self, password: &[u8], salt: &[u8]) -> String {
        argon2::hash_encoded(password, salt, &self.config).unwrap()
    }
}
