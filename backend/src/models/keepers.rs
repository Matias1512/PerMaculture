use diesel::prelude::*;
use serde::{Serialize, Deserialize};

use crate::schema::keepers;

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct Keeper {
    pub id: i32,
    pub user_name: String,
    pub display_name: String,
    pub email: String,
    pub password: String,
    pub is_admin: bool,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

impl Keeper {
    pub fn empty() -> Self {
        Self {
            id: 0,
            user_name: String::new(),
            display_name: String::new(),
            email: String::new(),
            password: String::new(),
            is_admin: false,
            created_at: chrono::Utc::now().naive_utc(),
            updated_at: chrono::Utc::now().naive_utc(),
        }
    }
}

#[derive(Insertable, Deserialize, AsChangeset)]
#[diesel(table_name = keepers)]
pub struct NewKeeper {
    pub user_name: String,
    pub display_name: String,
    pub email: String,
    pub password: String,
    pub is_admin: bool,
}

#[derive(Deserialize)]
pub struct LoginKeeper {
    pub email: String,
    pub password: String,
}
