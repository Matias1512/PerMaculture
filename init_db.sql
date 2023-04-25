CREATE TABLE plants (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	description TEXT NOT NULL,
	image_url VARCHAR
);

CREATE TABLE bugs (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	description TEXT NOT NULL,
	image_url VARCHAR,
	pollinator BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE SCHEMA IF NOT EXISTS custom_schema;
CREATE TYPE custom_schema."Interaction_Type" AS ENUM ('Repel', 'Attract');

CREATE TABLE plant_bugs_interactions (
    plant_id INTEGER NOT NULL REFERENCES plants(id),
    bug_id INTEGER NOT NULL REFERENCES bugs(id),
    interaction custom_schema."Interaction_Type" NOT NULL,
    PRIMARY KEY (plant_id, bug_id)
);
