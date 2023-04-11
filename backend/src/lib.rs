use std::env;

use diesel::{PgConnection, Connection, RunQueryDsl};
use dotenvy::dotenv;
use models::Plant;

pub mod models;
pub mod schema;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_op| panic!("Error connecting to {}", database_url))
}

async fn get_plants() -> Result<Vec<Plant>, diesel::ConnectionError> {
    use schema::plants::dsl::*;
    
    let conn = &mut establish_connection();
    let results = plants
        .load::<Plant>(conn)
        .expect("Error loading plants");

    Ok(results)
}