use actix_web::cookie::Cookie;
use jsonwebtoken::{decode, Algorithm, DecodingKey, TokenData, Validation};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub exp: i64,
    pub iat: i64,
    pub user_id: i32,
    pub fingerprint: String,
}

pub struct AuthMiddleware {
    pub_key: DecodingKey,
}

impl AuthMiddleware {
    pub fn new(pub_key: DecodingKey) -> Self {
        AuthMiddleware { pub_key }
    }

    pub fn decode(&self, jwt: &String) -> TokenData<Claims> {
        decode::<Claims>(&jwt, &self.pub_key, &Validation::new(Algorithm::RS256)).unwrap()
    }

    pub fn check(&self, jwt: Option<Cookie>, fingerprint: &String) -> Result<Claims, String> {
        let token = match jwt {
            Some(token) => token.value().to_string(),
            None => return Err("No json web token provided".to_string()),
        };

        let token_data = self.decode(&token.to_string()).claims;

        if !(token_data.fingerprint == *fingerprint) {
            return Err("Fingerprint from the token isn't the same from the provided fingerprint!".to_string());
        }

        Ok(token_data)
    }
}
