const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi ke database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kendari2023",
  database: "mahasiswa",
  port: 3309,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Koneksi ke database berhasil!");
});

// Endpoint root
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ GET semua data mahasiswa
app.get("/api/mahasiswa", (req, res) => {
  db.query("SELECT * FROM biodata", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error fetching data" });
    }
    res.json(results);
  });
});

