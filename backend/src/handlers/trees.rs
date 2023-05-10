use diesel::{QueryDsl, RunQueryDsl, ExpressionMethods, insert_into};
use rocket::{serde::json::Json, response::status::Created};
use crate::models::{trees::{Tree, trees, NewTree, UpdateTree}, Db};

use super::Result;

#[get("/")]
pub async fn get_trees(db: Db) -> Result<Json<Vec<Tree>>> {
    let trees = db.run(move |conn| {
        trees::table
            .select(trees::all_columns)
            .load::<Tree>(conn)
    }).await?;
    
    Ok(Json(trees))
}

#[post("/", data = "<tree>")]
pub async fn post_tree(db: Db, tree: Json<NewTree>) -> Result<Created<Json<Tree>>> {
    db.run(move |conn| {
        insert_into(trees::table)
            .values(tree.into_inner())
            .get_result::<Tree>(conn)
    }).await.map(|tree| {
        Created::new("/trees")
            .body(Json(tree))
    }).map_err(Into::into)
}

#[get("/<id>")]
pub async fn get_tree(db: Db, id: i32) -> Option<Json<Tree>> {
    db.run(move |conn| {
        trees::table
            .filter(trees::id.eq(id))
            .first(conn)
    }).await.map(Json).ok()
}

#[put("/<id>", data = "<tree>")]
pub fn put_tree(id: i32, tree: Json<Tree>) -> Result<Json<Tree>> {
    Ok(tree)
}

#[patch("/<id>", data = "<tree>")]
pub async fn patch_tree(db: Db, id: i32, tree: Json<UpdateTree>) -> Result<Json<Tree>> {
    db.run(move |conn| {
        diesel::update(trees::table)
            .filter(trees::id.eq(id))
            .set(tree.into_inner())
            .get_result::<Tree>(conn)
    }).await.map(Json).map_err(Into::into)
}

#[delete("/<id>")]
pub async fn delete_tree(db: Db, id: i32) -> Result<Option<()>> {
    let affected = db.run(move |conn| {
        diesel::delete(trees::table)
            .filter(trees::id.eq(id))
            .execute(conn)
    }).await?;

    Ok((affected == 1).then(|| ()))
}
