const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors()); 
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads",express.static("./uploads/"))
app.use('/api/tasks', tasksRouter);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});