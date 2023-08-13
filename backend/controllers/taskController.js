const moment = require("moment");
const connection = require("../config/db");

exports.createTask = async (req, res) => {
  const { heading, description, priority, date, time } = req.body;

  let image = null; // Initialize image to null

  if (req.file) {
    image = req.file.filename; // Updated image only if file is available
  }
  if (!heading || !description || !date || !time || !image) {
    res.status(422).json({ status: 422, message: "Fill all details" });
    return; // Return to avoid further execution
  }

  try {
    const query = "INSERT INTO tasks SET ? ";
    const values = { heading, description, priority, date, time, image };

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error adding data:", err);
        res
          .status(500)
          .json({
            status: 500,
            message: "An error occurred while adding data",
          });
      } else {
        console.log("Data added successfully");
        res.status(201).json({ status: 201, data: req.body });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "An error occurred" });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { heading, description, date, time } = req.body;

  let image = null; // Initialize image to null

  if (req.file) {
    image = req.file.filename; // Updated image only if file is available
  }

  if (!heading || !description || !date || !time) {
    res.status(422).json({ status: 422, message: "Fill all details" });
    return; // Return to avoid further execution
  }

  try {
    let query, values;

    if (image) {
      query =
        "UPDATE tasks SET heading = ?, description = ?, date = ?, time = ?, image = ? WHERE id = ?";
      values = [heading, description, date, time, image, taskId];
    } else {
      query =
        "UPDATE tasks SET heading = ?, description = ?, date = ?, time = ? WHERE id = ?";
      values = [heading, description, date, time, taskId];
    }

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        res
          .status(500)
          .json({
            status: 500,
            message: "An error occurred while updating data",
          });
      } else {
        console.log("Data updated successfully");
        res
          .status(200)
          .json({ status: 200, message: "Data updated successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "An error occurred" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const query = "SELECT * FROM tasks WHERE id = ?";

    connection.query(query, [taskId], (err, result) => {
      if (err) {
        console.log("error on getting unique task");
      } else {
        console.log("data sended");
        res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching unique task" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    connection.query("SELECT * FROM tasks", (err, result) => {
      if (err) {
        console.log("error");
      } else {
        console.log("data sended");
        res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const query = "DELETE FROM tasks WHERE id = ?";

    connection.query(query, [taskId], (err, result) => {
      if (err) {
        console.log("error on deleting task");
        res
          .status(500)
          .json({ error: "An error occurred while deleting the task" });
      } else {
        console.log("task deleted");
        res.status(200).json({ message: "Task deleted successfully" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task" });
  }
};
