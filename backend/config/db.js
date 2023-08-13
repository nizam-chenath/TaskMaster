const mysql = require('mysql2');

const databaseConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasklist_db',
};

const connection = mysql.createConnection(databaseConfig);

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
    createTasksTable();
  }
});

function createTasksTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      heading VARCHAR(255) NOT NULL,
      description TEXT,
      priority VARCHAR(20),
      date DATE,
      time TIME,
      image VARCHAR(255)
    )
  `;

  connection.query(createTableQuery, (error) => {
    if (error) {
      console.error('Error creating tasks table:', error);
    } else {
      console.log('Tasks table created or already exists');
    }
  });
}

module.exports = connection;





