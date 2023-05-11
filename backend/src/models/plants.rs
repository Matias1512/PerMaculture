use diesel::{Insertable, Queryable, table, AsChangeset};
use rocket::serde::{Serialize, Deserialize};

table! {
    plants (id) {
        id -> Int4,
        name -> Varchar,
        description -> Text,
        image_url -> Nullable<Varchar>,
    }
}

#[derive(Queryable, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
pub struct Plant {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
}

#[derive(Insertable, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = plants)]
pub struct NewPlant {
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
}

#[derive(AsChangeset, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = plants)]
pub struct UpdatePlant {
    pub name: Option<String>,
    pub description: Option<String>,
    pub image_url: Option<String>,
}
