use std::io;

use backend::models::keepers::{NewKeeper, Keeper};
use diesel::RunQueryDsl;

fn main() {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            let conn = &mut backend::establish_connection();

            let mut keeper_name = String::new();
            let mut keeper_displayname = String::new();
            let mut keeper_email = String::new();
            let mut keeper_password = String::new();
            let mut keeper_isadmin = String::new();

            println!("Enter keeper name: ");
            io::stdin().read_line(&mut keeper_name).expect("Failed to read line");
            let keeper_name = keeper_name.trim_end();

            println!("Enter keeper '{}' display name: ", keeper_name);
            io::stdin().read_line(&mut keeper_displayname).expect("Failed to read line");
            let keeper_displayname = keeper_displayname.trim_end();

            println!("Enter keeper '{}' email: ", keeper_name);
            io::stdin().read_line(&mut keeper_email).expect("Failed to read line");
            let keeper_email = keeper_email.trim_end();

            println!("Enter keeper '{}' password: ", keeper_name);
            io::stdin().read_line(&mut keeper_password).expect("Failed to read line");
            let keeper_password = keeper_password.trim_end();

            println!("Is keeper '{}' an admin? (y/N) ", keeper_name);
            io::stdin().read_line(&mut keeper_isadmin).expect("Failed to read line");

            let keeper = NewKeeper {
                user_name: keeper_name.to_string(),
                display_name: keeper_displayname.to_string(),
                email: keeper_email.to_string(),
                password: keeper_password.to_string(),
                is_admin: keeper_isadmin.trim_end() == "y" || keeper_isadmin.trim_end() == "Y" ,
            };

            let result = diesel::insert_into(backend::schema::keepers::table)
                .values(&keeper)
                .get_result::<Keeper>(conn)
                .expect("Error inserting keeper");
            println!("Keeper inserted: {}", result.user_name);
        });
}