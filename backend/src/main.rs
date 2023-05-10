#[macro_use]
extern crate rocket;

mod handlers;
mod models;

use handlers::Cors;
use handlers::all_options;
use handlers::bugs::*;
use handlers::plants::*;
use handlers::trees::*;

use models::Db;
use rocket::Build;
use rocket::Rocket;
use rocket::fairing::AdHoc;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/hello/<name>")]
fn hello(name: &str) -> String {
    format!("Hello, {}!", name)
}

async fn run_migrations(rocket: Rocket<Build>) -> Rocket<Build> {
    use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

    const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");
    Db::get_one(&rocket).await
        .expect("Expected database connection")
        .run(|conn| {
            conn.run_pending_migrations(MIGRATIONS)
                .expect("Failed to run database migrations");
        }).await;
    rocket
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Db::fairing())
        .attach(AdHoc::on_ignite("Diesel Postgresql Migrations", run_migrations))
        .attach(Cors)
        .mount("/", routes![index, hello, all_options])
        .mount(
            "/plants",
            routes![
                get_plants,
                get_plant,
                post_plant,
                put_plant,
                patch_plant,
                delete_plant
            ],
        )
        .mount(
            "/bugs",
            routes![get_bugs, get_bug, post_bug, put_bug, patch_bug, delete_bug],
        )
        .mount(
            "/trees",
            routes![
                get_trees,
                get_tree,
                post_tree,
                put_tree,
                patch_tree,
                delete_tree
            ],
        )
}
