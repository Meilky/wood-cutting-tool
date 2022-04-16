use jsonwebtoken::{decode, Algorithm, DecodingKey,EncodingKey, TokenData, Validation, encode, Header};

use crate::api::v1::user::models::User;

pub struct AuthMiddleware {
    pub_key: DecodingKey,
    pri_key: EncodingKey,
    header: Header,
}

pub trait AuthMiddlewareTrait<T> {
    fn parse(&self, jwt: &String) -> TokenData<T>;
    fn encode(&self, data: &T) -> String;
}

impl AuthMiddleware {
    pub fn new(pub_key: DecodingKey,pri_key: EncodingKey, header:Header) -> Self {
        AuthMiddleware { pub_key, pri_key,header }
    }
}

impl AuthMiddlewareTrait<User> for AuthMiddleware {
    fn parse(&self, jwt: &String) -> TokenData<User> {
        decode::<User>(&jwt, &self.pub_key, &Validation::new(Algorithm::RS256)).unwrap()
    }

    fn encode(&self, data: &User) -> String {
        encode(&self.header, &data, &self.pri_key).unwrap()
    }
}
