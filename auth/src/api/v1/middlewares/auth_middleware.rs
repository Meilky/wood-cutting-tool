use jsonwebtoken::{
    decode, encode, Algorithm, DecodingKey, EncodingKey, Header, TokenData, Validation,
};
use crate::api::v1::user::models::TokenInnerData;

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
    pub fn new(pub_key: DecodingKey, pri_key: EncodingKey, header: Header) -> Self {
        AuthMiddleware {
            pub_key,
            pri_key,
            header,
        }
    }
}

impl AuthMiddlewareTrait<TokenInnerData> for AuthMiddleware {
    fn parse(&self, jwt: &String) -> TokenData<TokenInnerData> {
        decode::<TokenInnerData>(&jwt, &self.pub_key, &Validation::new(Algorithm::RS256)).unwrap()
    }

    fn encode(&self, data: &TokenInnerData) -> String {
        encode(&self.header, &data, &self.pri_key).unwrap()
    }
}
