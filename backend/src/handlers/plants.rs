use axum::{Extension, http::StatusCode, Json, extract::Path};
use deadpool_diesel::postgres::Pool;
use diesel::{RunQueryDsl, QueryDsl, prelude::*};

use crate::{models::plants::{Plant, NewPlant}, schema};

#[axum_macros::debug_handler]
pub async fn get_plants(
    Extension(pool): Extension<Pool>
) -> (StatusCode, Json<Vec<Plant>>) {
    use schema::plants::dsl::*;
    
    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };
    
    let result = conn.interact(|conn| {
        let result: Vec<Plant> = plants.load::<Plant>(conn)
            .expect("Error loading plants");
        result
    }).await.expect("Error interacting with connection");

    (StatusCode::OK, Json(result))
}

#[axum_macros::debug_handler]
pub async fn create_plant(
    Extension(pool): Extension<Pool>,
    Json(payload): Json<NewPlant>,
) -> (StatusCode, Json<Plant>) {
    use schema::plants;

    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };
    
    let result = conn.interact(move |conn| {
        let result = diesel::insert_into(plants::table)
            .values(&payload)
            .get_result(conn)
            .expect("Error saving new plant");
        result
    }).await.expect("Error interacting with connection");

    (StatusCode::CREATED, Json(result))
}

#[derive(serde::Serialize)]
pub struct DeletionResponse {
    message: String,
    deleted_plant_id: i32,
}

#[axum_macros::debug_handler]
pub async fn remove_plant(
    Extension(pool): Extension<Pool>,
    Path(plant_id): Path<i32>,
) -> (StatusCode, Json<DeletionResponse>) {
    use schema::plants::dsl::*;

    let conn = match pool.get().await {
        Ok(conn) => conn,
        Err(e) => {
            panic!("Error getting connection from pool: {}", e);
        }
    };
    
    let id_to_delete = plant_id;
    let result = conn.interact(move |conn| {
        let result = match diesel::delete(plants.filter(id.eq(id_to_delete))).execute(conn) {
            Ok(affected_rows) => affected_rows,
            Err(e) => {
                panic!("Error deleting plant: {}", e);
            }
        };
        result
    }).await.unwrap_or_default();

    if result == 0 {
        let result = DeletionResponse {
            message: "Plant not found".to_string(),
            deleted_plant_id: id_to_delete,
        };
        return (StatusCode::NOT_FOUND, Json(result));
    }

    if result > 1 {
        let result = DeletionResponse {
            message: "Multiple plants deleted".to_string(),
            deleted_plant_id: id_to_delete,
        };
        return (StatusCode::INTERNAL_SERVER_ERROR, Json(result));
    }

    let result = DeletionResponse {
        message: "Plant deleted successfully".to_string(),
        deleted_plant_id: id_to_delete,
    };

    (StatusCode::OK, Json(result))
}
