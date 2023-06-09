const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")

async function openDb() {
    return sqlite.open({
        filename: "../database.sqlite",
        driver: sqlite3.Database,
    })
}

export default async function setFavorite(req, res) {
    const db = await openDb()

    if (req.method === "POST") {
        const statement = await db.prepare(
            "INSERT INTO Favorite (charityId, charityTitle, charitySummary, charityImage, charityUrl, ownerId) VALUES (?, ?, ?, ?, ?, ?)"
        )
        try {
            await statement.run(
                req.body.charityId,
                req.body.charityTitle,
                req.body.charitySummary,
                req.body.charityImage,
                req.body.charityUrl,
                req.body.ownerId
            )
        } catch (err) {
            console.log(err)
        }

        const allFavorite = await db.all("SELECT * FROM Favorite")
        console.log(allFavorite)
        res.json({ message: "Favorite added", success: true })
    } else {
        res.status(405).json({
            message: "We only support POST",
            success: false,
        })
    }
}
