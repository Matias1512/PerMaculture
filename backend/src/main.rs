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

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/hello/<name>")]
fn hello(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Db::fairing())
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
