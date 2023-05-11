use std::io;

use backend::{schema::plants, models::plants::Plant};
use diesel::{RunQueryDsl, QueryDsl, ExpressionMethods};

fn main() {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            let conn = &mut backend::establish_connection();

            let all_plants: Vec<Plant> = plants::table.load(conn).expect("Error loading plants");
            println!("Plants: ");
            all_plants.iter().for_each(|plant| {
                println!("{}: {}", plant.id, plant.name);
            });

            println!("Enter the id of the plant you want to update: ");
            let mut to_update = String::new();
            io::stdin().read_line(&mut to_update).expect("Failed to read line");

            // Verify that the plant exists
            let plant = plants::table
                .filter(plants::id.eq(to_update.trim().parse::<i32>().expect("Please enter a valid plant id")))
                .first::<Plant>(conn)
                .expect("Plant not found");
            // Print the plant's data
            println!("Selected plant: {:?}", plant);

            // Ask the user to enter the new name of the plant
            println!("Enter the new name of the plant ({} to continue): ", EOF);
            let mut new_name = String::new();
            io::stdin().read_line(&mut new_name).expect("Failed to read line");
            if new_name.trim().is_empty() {
                new_name = plant.name;
            }
            
            // Ask the user to enter the new description of the plant
            println!("Enter the new description of the plant ({} to continue): ", EOF);
            let mut new_description = String::new();
            io::stdin().read_line(&mut new_description).expect("Failed to read line");
            if new_description.trim().is_empty() {
                new_description = plant.description;
            }

            // Ask the user to enter the new image url of the plant
            println!("Enter the new image url of the plant ({} to continue): ", EOF);
            let mut new_image_url = String::new();
            io::stdin().read_line(&mut new_image_url).expect("Failed to read line");
            if new_image_url.trim().is_empty() && plant.image_url.is_some() {
                new_image_url = plant.image_url.unwrap();
            }

            // Update the plant in the database
            let result = diesel::update(plants::table.filter(plants::id.eq(plant.id)))
                .set((
                    plants::name.eq(new_name.trim()),
                    plants::description.eq(new_description.trim()),
                    plants::image_url.eq(new_image_url.trim()),
                ))
                .execute(conn)
                .expect("Error updating plant");

            println!("{} plants updated", result);
        });
}

#[cfg(not(windows))]
const EOF: &str = "CTRL+D";

#[cfg(windows)]
const EOF: &str = "CTRL+Z";