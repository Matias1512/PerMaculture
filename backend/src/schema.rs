// @generated automatically by Diesel CLI.

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
    members (member_id) {
        member_id -> Varchar,
        display_name -> Varchar,
        is_admin -> Bool,
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

diesel::allow_tables_to_appear_in_same_query!(
    bugs,
    members,
    plants,
);
