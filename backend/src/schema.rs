// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "Interaction_Type", schema = "custom_schema"))]
    pub struct InteractionType;
}

diesel::table! {
    bugs (id) {
        id -> Int4,
        name -> Varchar,
        description -> Text,
        image_url -> Nullable<Varchar>,
        pollinator -> Bool,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::InteractionType;

    plant_bugs_interactions (plant_id, bug_id) {
        plant_id -> Int4,
        bug_id -> Int4,
        interaction -> InteractionType,
    }
}

diesel::table! {
    plants (id) {
        id -> Int4,
        name -> Varchar,
        description -> Text,
        image_url -> Nullable<Varchar>,
    }
}

diesel::joinable!(plant_bugs_interactions -> bugs (bug_id));
diesel::joinable!(plant_bugs_interactions -> plants (plant_id));

diesel::allow_tables_to_appear_in_same_query!(
    bugs,
    plant_bugs_interactions,
    plants,
);
