const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const pg= require("pg");

const app = express();
const port = 3000;

const db= new pg.Client({
    user:"postgres",
    host:"localhost",
    database: "portfolio",
    password:"Nishant@ily",
    port:"5432"
})
db.connect();

app.set('view engine', 'ejs'); //important for logo image

app.use(express.static(path.join(__dirname,"public")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async(req,res)=>{
    res.render("index.ejs")
})

app.get("/home", async(req,res)=>{
    res.render("index.ejs")
})

app.post("/submit", async(req, res) => {
    const { Name: name, Email: email, Message: message } = req.body;

    try {
        await db.query("INSERT INTO contact_me (name, email, message) VALUES ($1, $2, $3)", [name, email, message]);

        const successMessage = "Message received successfully";
        res.render("index.ejs", { successMessage: successMessage });
    } catch (err) {
        console.error("Error inserting into database:", err);
        res.status(500).json({ success: false, message: "Failed to send message to Nishant" });
    }
});


app.listen(port, (req, res) => {
    console.log(`App is running at port ${port}`);
});