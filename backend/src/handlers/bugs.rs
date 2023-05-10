use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, insert_into};
use rocket::{serde::json::Json, response::status::Created};
use crate::models::{bugs::{Bug, bugs, NewBug, UpdateBug}, Db};

use super::Result;

#[get("/")]
pub async fn get_bugs(db: Db) -> Result<Json<Vec<Bug>>> {
    let bugs = db.run(move |conn| {
        bugs::table
            .select(bugs::all_columns)
            .load::<Bug>(conn)
    }).await?;
    
    Ok(Json(bugs))
}

#[post("/", data = "<bug>")]
pub async fn post_bug(db: Db, bug: Json<NewBug>) -> Result<Created<Json<Bug>>> {
    db.run(move |conn| {
        insert_into(bugs::table)
            .values(bug.into_inner())
            .get_result::<Bug>(conn)
    }).await.map(|bug| {
        Created::new("/bugs")
            .body(Json(bug))
    }).map_err(Into::into)
}

#[get("/<id>")]
pub async fn get_bug(db: Db, id: i32) -> Option<Json<Bug>> {
    db.run(move |conn| {
        bugs::table
            .filter(bugs::id.eq(id))
            .first(conn)
    }).await.map(Json).ok()
}

#[put("/<id>", data = "<bug>")]
pub fn put_bug(id: i32, bug: Json<Bug>) -> Result<Json<Bug>> {
    Ok(bug)
}

#[patch("/<id>", data = "<bug>")]
pub async fn patch_bug(db: Db, id: i32, bug: Json<UpdateBug>) -> Result<Json<Bug>> {
    db.run(move |conn| {
        diesel::update(bugs::table)
            .filter(bugs::id.eq(id))
            .set(bug.into_inner())
            .get_result::<Bug>(conn)
    }).await.map(Json).map_err(Into::into)
}

#[delete("/<id>")]
pub async fn delete_bug(db: Db, id: i32) -> Result<Option<()>> {
    let affected = db.run(move |conn| {
        diesel::delete(bugs::table)
            .filter(bugs::id.eq(id))
            .execute(conn)
    }).await?;

    Ok((affected == 1).then(|| ()))
}
