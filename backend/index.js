// const express = require('express'); // in package.json, we have type: module, so we can use import instead of require
import express from 'express'; // to use express.
import dotenv from 'dotenv'; // to use .env file
import cors from 'cors'; // to use cors
import cookieParser from 'cookie-parser'; // to parse the incoming cookies
import path from 'path'; // to use path module

import { connectDB } from './db/connectDB.js'; // we need keep the .js extension because we are using type: module in package.json

import authRoutes from './routes/auth.route.js'; // we need keep the .js extension because we are using type: module in package.json

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); // to get the absolute path of the current directory

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // to allow the frontend to access the backend

app.use(express.json()); // to parse the incoming request with JSON payloads :req.body
app.use(cookieParser()); // to parse the incoming cookies

// Routes
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") { // if the server is running in production mode
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Listen the Server

app.listen(PORT, () => { // we can use any port number, but 5000 is a common port number for backend. We can use 3000 as well
  connectDB();
  console.log("Server is listening on port: ", PORT);
});

