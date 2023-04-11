use std::io;

use backend::{
    schema::{plants, bugs},
    models::{plants::Plant, interactions::{Interaction, BugPlantInteraction}, bugs::Bug}
};
use diesel::RunQueryDsl;

fn main() {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            let conn = &mut backend::establish_connection();

            let mut plant_id = String::new();
            let mut bug_id = String::new();
            let mut interaction = String::new();

            // Get list of plants
            let plants: Vec<Plant> = plants::table.load(conn).expect("Error loading plants");
            println!("Plants:");
            for plant in plants {
                println!("{}: {}", plant.id, plant.name);
            }

            println!("Choose a plant id: ");
            io::stdin().read_line(&mut plant_id).expect("Failed to read line");
            let plant_id = plant_id.trim_end().parse::<i32>().unwrap();

            // Get list of bugs
            let bugs: Vec<Bug> = bugs::table.load(conn).expect("Error loading bugs");
            println!("Bugs:");
            for bug in bugs {
                println!("{}: {}", bug.id, bug.name);
            }

            println!("Choose a bug id: ");
            io::stdin().read_line(&mut bug_id).expect("Failed to read line");
            let bug_id = bug_id.trim_end().parse::<i32>().unwrap();

            println!("Choose an interaction (Repel/Attract): ");
            io::stdin().read_line(&mut interaction).expect("Failed to read line");
            let interaction = interaction.trim_end();

            let interaction = match interaction {
                "Repel" => Interaction::Repel,
                "Attract" => Interaction::Attract,
                _ => panic!("Invalid interaction"),
            };

            let interaction = BugPlantInteraction {
                bug_id,
                plant_id,
                interaction,
            };

            let result = diesel::insert_into(backend::schema::plant_bugs_interactions::table)
                .values(&interaction)
                .get_result::<BugPlantInteraction>(conn)
                .expect("Error inserting bug plant interaction");

            println!("Inserted interaction: {:?}", result);
        });
}