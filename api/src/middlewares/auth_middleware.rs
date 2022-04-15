use jsonwebtoken::{decode, Algorithm, DecodingKey, TokenData, Validation};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Claims {}

pub struct AuthMiddleware {
    pub_key: DecodingKey,
}

impl AuthMiddleware {
    pub fn new(pub_key: DecodingKey) -> Self {
        AuthMiddleware { pub_key }
    }

    pub fn parse(&self, jwt: String) -> TokenData<Claims> {
        decode::<Claims>(&jwt, &self.pub_key, &Validation::new(Algorithm::RS256)).unwrap()
    }
}
