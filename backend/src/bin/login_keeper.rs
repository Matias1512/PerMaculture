use std::io;
use backend::models::keepers::Keeper;
use diesel::{RunQueryDsl, QueryDsl, prelude::*};

fn main() {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            let conn = &mut backend::establish_connection();

            let mut keeper_email = String::new();
            let mut keeper_password = String::new();

            println!("Enter keeper email: ");
            io::stdin().read_line(&mut keeper_email).expect("Failed to read line");
            let keeper_email = keeper_email.trim_end();

            println!("Enter keeper password: ");
            io::stdin().read_line(&mut keeper_password).expect("Failed to read line");
            let keeper_password = keeper_password.trim_end();

            // Get keeper from email
            let keeper = backend::schema::keepers::table
                .filter(backend::schema::keepers::email.eq(keeper_email))
                .first::<Keeper>(conn)
                .expect("Error getting keeper");

            // Check password
            if keeper.password != keeper_password {
                println!("Incorrect password");
                return;
            }

            // Generate token
            let token = backend::generate_token(&keeper);

            println!("Token: {}", token);
        });
}