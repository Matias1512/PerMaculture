use diesel::prelude::*;
use serde::Deserialize;

use crate::schema::bugs;

#[derive(Queryable)]
pub struct Bug {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
    pub pollinator: bool,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = bugs)]
pub struct NewBug {
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
    pub pollinator: bool,
}