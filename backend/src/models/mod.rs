use rocket_sync_db_pools::{diesel, database};

pub mod plants;
pub mod bugs;
pub mod trees;

#[database("plantera_db")]
pub struct Db(diesel::PgConnection);
