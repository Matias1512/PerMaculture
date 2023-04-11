use diesel::prelude::*;

#[derive(Queryable)]
pub struct Plant {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub image_url: Option<String>,
}
