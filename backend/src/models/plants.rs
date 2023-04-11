use diesel::prelude::*;
use serde::{Serialize, Deserialize};

use crate::schema::plants;

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct Plant {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = plants)]
pub struct NewPlant {
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
}