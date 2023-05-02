use std::env;
use std::collections::BTreeMap;

use diesel::{PgConnection, Connection};
use dotenvy::dotenv;

use hmac::{Hmac, Mac};
use jwt::SignWithKey;
use models::keepers::Keeper;
use sha2::Sha256;

pub mod models;
pub mod schema;
pub mod handlers;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_op| panic!("Error connecting to {}", database_url))
}

pub fn generate_token(keeper: &Keeper) -> String {
    dotenv().ok();
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let key: Hmac<Sha256> = Hmac::new_from_slice(secret.as_bytes()).unwrap();
    let mut claims = BTreeMap::<String, String>::new();
    
    claims.insert("id".to_string(), keeper.id.to_string());
    claims.insert("email".to_string(), keeper.email.clone());
    claims.insert("is_admin".to_string(), keeper.is_admin.to_string());

    let token_str = claims.sign_with_key(&key).unwrap();

    token_str
}
