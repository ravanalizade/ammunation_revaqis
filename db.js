const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (it'll create a new file named 'mydatabase.db')
const db = new sqlite3.Database('usersdb.db');

// Create a 'users' table
db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      password TEXT,
      email TEXT
    )
  `);

  console.log('Table "users" created successfully!');

  // Close the database connection
  db.close();
});
