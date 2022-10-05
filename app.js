import express from "express";
import session from "express-session";
import * as url from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config"

import * as student from "./routes/student.js";
import * as unlock from "./routes/unlock.js";
import { Student } from "./models/student.js";

export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

let databaseConnected = true;

// database
try {
    const uri = process.env.DB_URI;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "students" })
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
} catch {
    databaseConnected = false;
    console.log("database wtf!");
}

const app = express();

app.set("view engine", "pug");
app.use("/public", express.static(__dirname + "/public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    name:"password", 
    saveUninitialized:true,
    resave: true,
    cookie: {maxAge: 3600000}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/test", async (req, res) => {
    await Student.find().sort({ "lName": 1 }).then(async (list) => {
        res.render("qrcodespdf", { studentList: list });
    });
});

app.use("/unlock", unlock.router)

app.use((req, res, next) => {
    if (!databaseConnected) {
        return res.send("database no work try something else ig, maybe internet?????")
    }

    if(req.session.password != process.env.UNLOCK_PASSWORD){ 
        return res.redirect(`/unlock?origin=${req.originalUrl}`);
    }
    next();
});

app.use("/student", student.router);

app.get("*", function(req, res){
    res.status(404).redirect("/student");
});

app.listen(5000);   