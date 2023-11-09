const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a new SQLite database and open a connection
const db = new sqlite3.Database('user_data.db');

// Create a users table if it doesn't exist
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT, password TEXT)");
});

app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for handling user sign-up
app.post('/signup', (req, res) => {
  const { name, username, password } = req.body;

  // Insert user data into the users table
  const stmt = db.prepare("INSERT INTO users (name, username, password) VALUES (?, ?, ?)");
  stmt.run(name, username, password);
  stmt.finalize();

  res.send('User registered successfully.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
