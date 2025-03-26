import pool from "./pool"

async function addGame(title, year) {
    await pool.query("INSERT INTO game VALUES ($1, $2)", [title, year])
}

async function addGenre(name) {
    await pool.query("INSERT INTO genre VALUES ($1)", [name])
}

async function addDeveloper(name) {
    await pool.query("INSERT INTO developer VALUES ($1)", [name])
}

export default {
    addGame,
    addGenre,
    addDeveloper
}

