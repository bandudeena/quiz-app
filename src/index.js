import express from "express";
import bodyParser from "body-parser";
import Knex from "knex";
import { Model } from "objection";
import config from "./db/knexfile.js";
import router from "./routes/index.js";

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// Initialize knex
const knex = Knex(config.development);

app.set("port", port);

// Load express bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Bind all Models to a knex instance
Model.knex(knex);

// Import API Routes
app.use("/api", router);

process.env.JWT_SECRET = "dGhpcyBpcyBhIGp3dCBrZXk=";

// Listen the server
app.listen(port, host);
console.log("🚀  Server listening on " + host + ":" + port);
