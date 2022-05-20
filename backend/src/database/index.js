const mysql2 = require("mysql2");

// create connection
const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

// test database connection
db.connect((error) => {
  if (error) {
    console.log("error : ", error);
  }
  console.log(`database is connected, threadId : ${db.threadId}.`);
});

// export connection
module.exports = db;
