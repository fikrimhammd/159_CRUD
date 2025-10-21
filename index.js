const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kendari2023",
  database: "mahasiswa",
  port: 3309,
});

