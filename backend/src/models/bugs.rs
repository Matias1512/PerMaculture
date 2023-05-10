use diesel::{Insertable, Queryable, table, AsChangeset};
use rocket::serde::{Serialize, Deserialize};

table! {
    bugs (id) {
        id -> Int4,
        name -> Varchar,
        description -> Text,
        image_url -> Nullable<Varchar>,
        pollinator -> Bool,
    }
}

#[derive(Queryable, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
pub struct Bug {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
    pub pollinator: bool,
}

#[derive(Insertable, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = bugs)]
pub struct NewBug {
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
    pub pollinator: bool,
}

#[derive(AsChangeset, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = bugs)]
pub struct UpdateBug {
    pub name: Option<String>,
    pub description: Option<String>,
    pub image_url: Option<String>,
    pub pollinator: Option<bool>,
}
