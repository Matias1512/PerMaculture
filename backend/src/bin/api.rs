use std::{env, net::SocketAddr};

use axum::{Router, routing::{get, patch}, Extension};
use deadpool_diesel::{postgres::{Manager, Pool}, Runtime};
use tower_http::cors::CorsLayer;
use dotenvy::dotenv;

use backend::handlers::plants::{get_plants, create_plant, remove_plant, update_plant};

fn main() {
    dotenv().ok();

    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            let manager = Manager::new(env::var("DATABASE_URL").expect("Database URL is needed."), Runtime::Tokio1);
            let pool = Pool::builder(manager)
                .max_size(10)
                .build()
                .unwrap();
            let app = Router::new()
                .route("/plants", 
                    get(get_plants)
                    .post(create_plant)
                )
                .route("/plants/:id",
                    patch(update_plant)
                    .delete(remove_plant))
                .layer(CorsLayer::permissive())
                .layer(Extension(pool));
            let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
            println!("Listening on http://{}", addr);
            axum::Server::bind(&addr)
                .serve(app.into_make_service())
                .await
                .unwrap();
        });
}
