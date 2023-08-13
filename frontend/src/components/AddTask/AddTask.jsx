import React, { useState } from 'react';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';

import './AddTask.css';

function AddTask() {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('')
  const [image, setImage] = useState(null);

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('description', description);
    formData.append('priority', priority)
    formData.append('date', date);
    formData.append('time', time);
    formData.append('image', image);
   

    

    try {
      const res = await axios.post('http://localhost:3001/api/tasks/add',formData);
      console.log(res)
      if(res.status === 201){

          navigate('/')
      }
      // Redirect or update state to show the new task
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-task">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="heading">Heading</label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option value="" disabled>Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
        
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="submit-button">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
