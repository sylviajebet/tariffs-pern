const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//Create a New Sub
app.post("/tariffs", async(req, res) => {
    try {
        const { sub_name, phone_no, date_of_birth, tariff_id, area_code, avg_spending } = req.body;
        const newSub = await pool.query("INSERT INTO subscribers (sub_name, phone_no, date_of_birth, tariff_id, area_code, avg_spending) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [sub_name, phone_no, date_of_birth, tariff_id, area_code, avg_spending]
        );

        res.json(newSub.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Subs

app.get("/tariffs", async(req, res) => {
    try {
        const allSubs = await pool.query("SELECT * FROM subscribers");
        res.json(allSubs.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//Get a Sub

app.get("/tariffs/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const sub = await pool.query("SELECT * FROM subscribers WHERE sub_id = $1", [id]);

        res.json(sub.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//Update a Sub

app.put("/tariffs/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {sub_name, phone_no, date_of_birth, tariff_id, area_code, avg_spending} = req.body;
        const updateSub = await pool.query("UPDATE subscribers SET (sub_name, phone_no, date_of_birth, tariff_id, area_code, avg_spending) = ($1, $2, $3, $4, $5, $6) WHERE sub_id = $7", [sub_name, phone_no, date_of_birth, tariff_id, area_code, avg_spending, id]);

        res.json("Subscriber was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//Delete a Sub

app.delete("/tariffs/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteSub = await pool.query("DELETE FROM subscribers WHERE sub_id = $1", [id]);
        res.json("Subscriber was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});