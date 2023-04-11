use std::env;

use diesel::{PgConnection, Connection};
use dotenvy::dotenv;

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
