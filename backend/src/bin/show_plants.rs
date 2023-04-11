use backend::models::*;
use diesel::prelude::*;

fn main() {
    use backend::schema::plants::dsl::*;

    let conn = &mut backend::establish_connection();
    let results = plants
        .load::<Plant>(conn)
        .expect("Error loading plants");

    println!("Displaying {} plants", results.len());
    for plant in results {
        println!("{}", plant.name);
        println!("----------\n");
        println!("{}", plant.description);
    }
}
