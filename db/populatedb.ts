import {Client} from "pg"

import dotenv from "dotenv"
dotenv.config()

const SQL = `
CREATE TABLE IF NOT EXISTS game (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    year INTEGER
);

INSERT INTO game (title, year)
VALUES 
    ('Fire Emblem Echoes: Shadows of Valentia', 2017),
    ('Fire Emblem: Three Houses', 2019),
    ('Fire Emblem Engage', 2023),
    ('The Legend of Zelda: Breath of the Wild', 2017),
    ('Minecraft', 2011),
    ('Elden Ring', 2022),
    ('Overwatch', 2016),
    ('Hollow Knight', 2017);

CREATE TABLE IF NOT EXISTS genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
);

INSERT INTO genre (name)
VALUES 
    ('Tactical-RPG'),
    ('Action-adventure'),
    ('Sandbox'),
    ('Survival'),
    ('Action-RPG'),
    ('First-person shooter'),
    ('Metroidvania');

CREATE TABLE IF NOT EXISTS developer (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
);

INSERT INTO developer (name)
VALUES
    ('Intelligent Systems'),
    ('Koei Tecmo'),
    ('Nintendo'),
    ('Mojang Studios'),
    ('FromSoftware'),
    ('Blizzard Entertainment'),
    ('Team Cherry');

CREATE TABLE IF NOT EXISTS game_genre (
    game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genre(id) ON DELETE CASCADE
);

INSERT INTO game_genre (game_id, genre_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 3),
    (5, 4),
    (6, 5),
    (7, 6),
    (8, 7);

CREATE TABLE IF NOT EXISTS game_developer (
    game_id INTEGER REFERENCES game(id) ON DELETE CASCADE,
    developer_id INTEGER REFERENCES developer(id) ON DELETE CASCADE
);

INSERT INTO game_developer (game_id, developer_id)
VALUES
    (1, 1),
    (2, 1),
    (2, 2),
    (3, 1),
    (4, 3),
    (5, 4),
    (6, 5),
    (7, 6),
    (8, 7);
`

async function main() {
    console.log("seeding...")
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")
}

main()

