import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/api';

import './TaskDetails.css';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch task details based on the ID and populate the state
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/tasks/${id}`);
        setTask(response.data.data[0]);
        console.log("response", response.data.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-details-container">
      <div className="task-image">
        <img src={`http://localhost:3001/uploads/${task.image}`} alt="Task" />
      </div>
      <div className="task-details">
        <h2>{task.heading}</h2>
        <p className="description">{task.description}</p>
        <div className="date-time">
          <p>Date: {task.date}</p>
          <p>Time: {task.time}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
