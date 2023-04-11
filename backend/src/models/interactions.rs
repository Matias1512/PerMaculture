use std::io::Write;

use diesel::{
    Queryable, Insertable, AsExpression, FromSqlRow,
    serialize::{ToSql, Output, self, IsNull},
    pg::{Pg, PgValue},
    deserialize::{FromSql, self}
};
use crate::schema::{plant_bugs_interactions, sql_types::InteractionType};

#[derive(Debug, PartialEq, FromSqlRow, AsExpression, Eq)]
#[diesel(sql_type = InteractionType)]
pub enum Interaction {
    Repel,
    Attract,
}

impl ToSql<InteractionType, Pg> for Interaction {
    fn to_sql<'b>(&'b self, out: &mut Output<'b, '_, Pg>) -> serialize::Result {
        match self {
            Interaction::Repel => out.write_all(b"Repel")?,
            Interaction::Attract => out.write_all(b"Attract")?,
        }
        Ok(IsNull::No)
    }
}

impl FromSql<InteractionType, Pg> for Interaction {
    fn from_sql(bytes: PgValue<'_>) -> deserialize::Result<Self> {
        match bytes.as_bytes() {
            b"Repel" => Ok(Interaction::Repel),
            b"Attract" => Ok(Interaction::Attract),
            _ => Err("Unrecognized enum variant".into()),
        }
    }
}

#[derive(Queryable, Insertable, Debug)]
#[diesel(table_name = plant_bugs_interactions)]
pub struct BugPlantInteraction {
    pub bug_id: i32,
    pub plant_id: i32,
    pub interaction: Interaction,
}