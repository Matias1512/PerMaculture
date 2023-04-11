use std::io::{self, Read};

use backend::models::bugs::{NewBug, Bug};
use diesel::RunQueryDsl;

fn main() {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            let conn = &mut backend::establish_connection();

            let mut bugname = String::new();
            let mut bugdescription = String::new();
            let mut bugimage = String::new();
            let mut bugpollinator = String::new();

            println!("Enter bug name: ");
            io::stdin().read_line(&mut bugname).expect("Failed to read line");
            let bugname = bugname.trim_end();

            println!("Enter bug '{}' description (Press {} when finished) ", bugname, EOF);
            io::stdin().read_to_string(&mut bugdescription).expect("Failed to read line");
            let bugdescription = bugdescription.trim_end();

            println!("Enter bug '{}' image url (Press {} when finished) ", bugname, EOF);
            io::stdin().read_to_string(&mut bugimage).expect("Failed to read line");
            let bugimage = bugimage.trim_end();

            println!("Is bug '{}' a pollinator? (y/N) ", bugname);
            io::stdin().read_line(&mut bugpollinator).expect("Failed to read line");

            let bug = NewBug {
                name: bugname.to_string(),
                description: bugdescription.to_string(),
                image_url: Some(bugimage.to_string()),
                pollinator: bugpollinator.trim_end() == "y" || bugpollinator.trim_end() == "Y" ,
            };

            let result = diesel::insert_into(backend::schema::bugs::table)
                .values(&bug)
                .get_result::<Bug>(conn)
                .expect("Error inserting bug");

            println!("Bug inserted: {}", result.name);
        });
}

#[cfg(not(windows))]
const EOF: &str = "CTRL+D";

#[cfg(windows)]
const EOF: &str = "CTRL+Z";