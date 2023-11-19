const express = require("express"); //back serveri yaratmaq ucundu
const app = express();   // cagiririq ki app yaransin            
const cors = require("cors");    // browser den back ende qosulmaq ucun


const sqlite3 = require('sqlite3').verbose(); // sql faylin isletmek ucundu
const fs = require('fs'); // fayli yoxlayir varsa okey, yoxdusa yaradir

app.use(cors());
app.use(express.json());  // back ve frontu elaqelendirir

const dbFilePath = 'usersdb.db'; // databs faylidi sadece

// Check if the database file already exists
const isDbExists = fs.existsSync(dbFilePath);   

// Connect to the SQLite database
const db = new sqlite3.Database(dbFilePath);

if (!isDbExists) {
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
    });
}

function addUser(name, password, email) {        // db ya user elave funk 
    const insertQuery = `       
      INSERT INTO users (name, password, email)    
      VALUES (?, ?, ?)
    `;

    db.run(insertQuery, [name, password, email], function (err) {    // sql e komanda verirsen ki elave ele bunlari 
        if (err) {
            console.error(err.message);
        } else {
            console.log(`User added with ID: ${this.lastID}`);
        }
    });
}

const getAllUsers = () => {                        // butun userleri verir
    const selectQuery = 'SELECT * FROM users';

    // Execute the query
    db.all(selectQuery, [], (err, rows) => {                // butun userleri qaytarir
        if (err) {
            console.error(err.message);
        } else {
            // Display the retrieved records
            console.log('All Users:');
            rows.forEach((row) => {
                console.log(`ID: ${row.id}, Name: ${row.name}, Password: ${row.password}, Email: ${row.email}`);
            });
        }
    });
};

app.listen(8000, (req, res) => {                      
    console.log(`server has started on port 8000`);
});

app.get("/", (req, res) => {
    res.send("Base Directory");
});

app.post("/", (req, res) => {           // frontdan back ende info atirsan
    data = req.body;
    username = data.username;
    email = data.email;
    passwd = data.password;
    addUser(username, email, passwd);   // 35 deki funku cag

    res.send("OK, Added");              // fronta elave edir ve ekrana verir    
    getAllUsers();
});
