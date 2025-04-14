import pool from "./pool"

async function gamesPost(title: string, year: number) {
    await pool.query("INSERT INTO game VALUES ($1, $2)", [title, year])
}

async function addGenre(name: string) {
    await pool.query("INSERT INTO genre VALUES ($1)", [name])
}

async function addDeveloper(name: string) {
    await pool.query("INSERT INTO developer VALUES ($1)", [name])
}

export default {
    gamesPost,
    addGenre,
    addDeveloper
}

