use std::io;

use backend::{schema::plants, models::plants::Plant};
use diesel::{RunQueryDsl, QueryDsl, ExpressionMethods};

fn main() {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            // Cli that allows you to remove a plant from the database
            let conn = &mut backend::establish_connection();
            // First get a list of all plants
            let all_plants: Vec<Plant> = plants::table.load(conn).expect("Error loading plants");
            // Print the ids and names of all plants
            println!("Plants: ");
            all_plants.iter().for_each(|plant| {
                println!("{}: {}", plant.id, plant.name);
            });
            // Ask the user to enter the id of the plant they want to remove
            println!("Enter the id of the plant you want to remove: ");
            let mut to_delete = String::new();
            io::stdin().read_line(&mut to_delete).expect("Failed to read line");
            // Remove the plant from the database
            let result = diesel::delete(plants::table.filter(plants::id.eq(to_delete.trim().parse::<i32>().expect("Please enter a number"))))
                .execute(conn)
                .expect("Error deleting plant");

            println!("{} plants deleted", result);
        });
}