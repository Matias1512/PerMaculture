use std::io;

use backend::{schema::keepers, models::keepers::Keeper};
use diesel::{RunQueryDsl, QueryDsl, ExpressionMethods};

fn main() {
    tokio::runtime::Builder::new_current_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            let conn = &mut backend::establish_connection();

            let all_keepers: Vec<Keeper> = keepers::table.load(conn).expect("Error loading keepers");
            println!("Keepers: ");
            all_keepers.iter().for_each(|keeper| {
                println!("{}: {}", keeper.id, keeper.user_name);
            });

            let mut to_delete = String::new();
            println!("Enter the id of the keeper you want to remove: ");
            io::stdin().read_line(&mut to_delete).expect("Failed to read line");

            let result = diesel::delete(keepers::table.filter(keepers::id.eq(to_delete.trim().parse::<i32>().expect("Please enter a number"))))
                .execute(conn)
                .expect("Error deleting keeper");
            println!("{} keepers deleted", result);
        });
}