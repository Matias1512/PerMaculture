use std::io::{self, Read};
use diesel::RunQueryDsl;

use backend::models::plants::{Plant, NewPlant};

fn main() {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            let conn = &mut backend::establish_connection();
    
            let mut name = String::new();
            let mut description = String::new();
            let mut image_url = String::new();
    
            println!("Enter plant name: ");
            io::stdin().read_line(&mut name).expect("Failed to read line");
            let name = name.trim_end();
    
            println!("Enter plant '{}' description (Press {} when finished) ", name, EOF);
            io::stdin().read_to_string(&mut description).expect("Failed to read line");
            let description = description.trim_end();

            println!("Enter plant '{}' image url (Press {} when finished) ", name, EOF);
            io::stdin().read_to_string(&mut image_url).expect("Failed to read line");
            let image_url = image_url.trim_end();
    
            let plant = NewPlant {
                name: name.to_string(),
                description: description.to_string(),
                image_url: Some(image_url.to_string()),
            };

            let result = diesel::insert_into(backend::schema::plants::table)
                .values(&plant)
                .get_result::<Plant>(conn)
                .expect("Error inserting plant");

            println!("Plant inserted: {}", result.name);
        });
}

#[cfg(not(windows))]
const EOF: &str = "CTRL+D";

#[cfg(windows)]
const EOF: &str = "CTRL+Z";