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

impl Plant {
    pub fn empty() -> Self {
        Self {
            id: 0,
            name: String::new(),
            description: String::new(),
            image_url: None,
        }
    }
}

#[derive(Insertable, Deserialize, AsChangeset)]
#[diesel(table_name = plants)]
pub struct NewPlant {
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
}