const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'test',
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("DB CONECTADA");
});

module.exports = connection;