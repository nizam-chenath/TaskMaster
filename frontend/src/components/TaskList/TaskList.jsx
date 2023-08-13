import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('all');

  const navigate = useNavigate()


  useEffect(() => {
    // Fetch list of tasks and populate the state
    const fetchTasks = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/tasks');
          const sortedTasks = response.data.data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
          setTasks(sortedTasks);
        } catch (error) {
          console.error(error);
        }
      };
    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`/api/tasks/${taskId}`);

        if (response.status === 200) {
            console.log('Task deleted successfully');
            window.location.reload(); // Refresh the task list
        } else {
            console.error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};


const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const filteredTasks = priorityFilter === 'all' ? tasks : tasks.filter(task => task.priority === priorityFilter);


  return (
    <div className="task-list">
      <h2>Task List</h2>
       <button className='btn-add' onClick={() => navigate('/add')}>Add Task</button>
       <div className="priority-filter">
        <label htmlFor="priority">Filter by Priority:</label>
        <select id="priority" value={priorityFilter} onChange={handlePriorityFilterChange}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <ul className="task-items">
        {filteredTasks.length > 0 && filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <Link to={`/task/${task.id}`} className="task-link">
              <div className="task-heading">{task.heading}</div>
              
              <div className="task-img">
              <img src={`http://localhost:3001/uploads/${task.image}`} alt="Task" width={200} height={200} />
              </div>
            </Link>
            <button className='btn' onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
            <button className='btn-delete' onClick={() =>deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
