const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")
import { authenticated } from "../../authenticate"

async function openDb() {
    return sqlite.open({
        filename: "../database.sqlite",
        driver: sqlite3.Database,
    })
}

export default authenticated(async function getSearchHistoryById(req, res) {
    const db = await openDb()

    const allSearchHistory = await db.all(
        "SELECT * FROM SearchHistory WHERE ownerId = ?",
        [req.query.id]
    )

    res.json(allSearchHistory)
})
