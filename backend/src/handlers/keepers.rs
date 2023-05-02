use axum::{Extension, http::StatusCode, Json, extract::Path};
use deadpool_diesel::postgres::Pool;
use diesel::{RunQueryDsl, QueryDsl, prelude::*};

use crate::{models::{keepers::{Keeper, NewKeeper, LoginKeeper}, Response, LoginResponse}, schema, generate_token};

#[axum_macros::debug_handler]
pub async fn get_keepers(
    Extension(pool): Extension<Pool>
) -> (StatusCode, Json<Vec<Keeper>>) {
    use schema::keepers::dsl::*;

    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };

    let result = conn.interact(|conn| {
        let result: Vec<Keeper> = keepers.load::<Keeper>(conn)
            .expect("Error loading keepers");
        result
    }).await.expect("Error interacting with connection");

    (StatusCode::OK, Json(result))
}

#[axum_macros::debug_handler]
pub async fn create_keeper(
    Extension(pool): Extension<Pool>,
    Json(payload): Json<NewKeeper>,
) -> (StatusCode, Json<Keeper>) {
    use schema::keepers;

    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };

    let result = conn.interact(move |conn| {
        let result = diesel::insert_into(keepers::table)
            .values(&payload)
            .get_result(conn)
            .expect("Error saving new keeper");
        result
    }).await.expect("Error interacting with connection");

    (StatusCode::CREATED, Json(result))
}

#[axum_macros::debug_handler]
pub async fn remove_keeper(
    Extension(pool): Extension<Pool>,
    Path(keeper_id): Path<i32>,
) -> (StatusCode, Json<Response>) {
    use schema::keepers::dsl::*;

    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };

    let result = conn.interact(move |conn| {
        let num_deleted = diesel::delete(keepers.filter(id.eq(keeper_id)))
            .execute(conn)
            .expect("Error deleting keeper");
        Response {
            message: format!("Deleted {} keeper(s)", num_deleted),
            id: keeper_id,
        }
    }).await.expect("Error interacting with connection");

    (StatusCode::OK, Json(result))
}

#[axum_macros::debug_handler]
pub async fn update_keeper(
    Extension(pool): Extension<Pool>,
    Path(keeper_id): Path<i32>,
    Json(payload): Json<NewKeeper>,
) -> (StatusCode, Json<Keeper>) {
    use schema::keepers::dsl::*;

    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };

    let result = conn.interact(move |conn| {
        let result = diesel::update(keepers.filter(id.eq(keeper_id)))
            .set(&payload)
            .get_result(conn)
            .expect("Error updating keeper");
        result
    }).await.expect("Error interacting with connection");

    (StatusCode::OK, Json(result))
}

#[axum_macros::debug_handler]
pub async fn get_keeper(
    Extension(pool): Extension<Pool>,
    Path(keeper_id): Path<i32>,
) -> (StatusCode, Json<Keeper>) {
    use schema::keepers::dsl::*;

    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };

    let result = conn.interact(move |conn| {
        let result = keepers.filter(id.eq(keeper_id))
            .first::<Keeper>(conn)
            .expect("Error loading keeper");
        result
    }).await.expect("Error interacting with connection");

    (StatusCode::OK, Json(result))
}

#[axum_macros::debug_handler]
pub async fn login(
    Extension(pool): Extension<Pool>,
    Json(payload): Json<LoginKeeper>,
) -> (StatusCode, Json<LoginResponse>) {
    use schema::keepers::dsl::*;

    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };

    let result = conn.interact(move |conn| {
        let result = keepers.filter(email.eq(&payload.email))
            .first::<Keeper>(conn)
            .expect("Error loading keeper");
        result
    }).await.expect("Error interacting with connection");

    let hashed_password = bcrypt::hash(&payload.password, bcrypt::DEFAULT_COST);
    if hashed_password.is_err() {
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(LoginResponse {
            token: "".to_string(),
            message: "An internal error occurred".to_string()
        }));
    }

    let valid = bcrypt::verify(result.password.clone(), &hashed_password.unwrap());

    if !valid.unwrap() {
        return (StatusCode::UNAUTHORIZED, Json(LoginResponse {
            token: "".to_string(),
            message: "Cannot authentify with those credentials".to_string()
        }));
    }
    let token = generate_token(&result);

    (StatusCode::OK, Json(LoginResponse {
        token,
        message: "Login successful".to_string()
    }))
}
