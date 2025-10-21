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

// ✅ POST tambah mahasiswa
app.post("/api/mahasiswa", (req, res) => {
  const { nama, alamat, agama } = req.body;

  if (!nama || !alamat || !agama) {
    return res
      .status(400)
      .json({ message: "Nama, alamat, dan agama harus diisi" });
  }

  db.query(
    "INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)",
    [nama, alamat, agama],
    (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Database Error" });
      }
      res.status(201).json({ message: "Mahasiswa berhasil ditambahkan" });
    }
  );
});

// ✅ PUT update data mahasiswa
app.put("/api/mahasiswa/:id", (req, res) => {
  const userId = req.params.id;
  const { nama, alamat, agama } = req.body;

  db.query(
    "UPDATE biodata SET nama = ?, alamat = ?, agama = ? WHERE id = ?",
    [nama, alamat, agama, userId],
    (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Database Error" });
      }
      res.json({ message: "Mahasiswa berhasil diperbarui" });
    }
  );
});


