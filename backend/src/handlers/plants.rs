use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, insert_into};
use rocket::{serde::json::Json, response::status::Created};
use crate::models::{plants::{Plant, plants, NewPlant, UpdatePlant}, Db};

use super::Result;

#[get("/")]
pub async fn get_plants(db: Db) -> Result<Json<Vec<Plant>>> {
    let plants = db.run(move |conn| {
        plants::table
            .select(plants::all_columns)
            .load::<Plant>(conn)
    }).await?;
    
    Ok(Json(plants))
}

#[post("/", data = "<plant>")]
pub async fn post_plant(db: Db, plant: Json<NewPlant>) -> Result<Created<Json<Plant>>> {
    db.run(move |conn| {
        insert_into(plants::table)
            .values(plant.into_inner())
            .get_result::<Plant>(conn)
    }).await.map(|plant| {
        Created::new("/plants")
            .body(Json(plant))
    }).map_err(Into::into)
}

#[get("/<id>")]
pub async fn get_plant(db: Db, id: i32) -> Option<Json<Plant>> {
    db.run(move |conn| {
        plants::table
            .filter(plants::id.eq(id))
            .first(conn)
    }).await.map(Json).ok()
}

#[put("/<id>", data = "<plant>")]
pub fn put_plant(id: i32, plant: Json<Plant>) -> Result<Json<Plant>> {
    Ok(plant)
}

#[patch("/<id>", data = "<plant>")]
pub async fn patch_plant(db: Db, id: i32, plant: Json<UpdatePlant>) -> Result<Json<Plant>> {
    db.run(move |conn| {
        diesel::update(plants::table)
            .filter(plants::id.eq(id))
            .set(plant.into_inner())
            .get_result::<Plant>(conn)
    }).await.map(Json).map_err(Into::into)
}

#[delete("/<id>")]
pub async fn delete_plant(db: Db, id: i32) -> Result<Option<()>> {
    let affected = db.run(move |conn| {
        diesel::delete(plants::table)
            .filter(plants::id.eq(id))
            .execute(conn)
    }).await?;

    Ok((affected == 1).then(|| ()))
}
