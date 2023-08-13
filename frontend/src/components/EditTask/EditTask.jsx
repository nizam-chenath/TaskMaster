import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';

import './EditTask.css';

function EditTask() {
  const { id } = useParams();
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState(null);
  const [editImage, setEditImage] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch task details based on the ID and populate the state
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        const task = response.data.data[0];
        setHeading(task.heading);
        setDescription(task.description);
        setDate(task.date.slice(0, 10));
        setTime(task.time);
        setImage(task.image);
        console.log(image)
        console.log(date)
        // Set other state properties accordingly
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('image', image);

    try {
      const res = await axios.put(`/api/tasks/${id}`, formData);
      // Redirect or update state to show the edited task
      if(res.status === 200){

        navigate('/')
    }
    } catch (error) {
      console.error(error);
    }
  };

  
//   useEffect(() => {
//     // Update file input value when image changes
//     if (image) {
//       const fileInput = document.getElementById('edit-image');
//       fileInput.value = image;
//     }
//   }, [image]);

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <label htmlFor="edit-heading">Heading</label>
        <input
          type="text"
          id="edit-heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />

        <label htmlFor="edit-description">Description</label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="edit-date">Date</label>
        <input
          type="date"
          id="edit-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="edit-time">Time</label>
        <input
          type="time"
          id="edit-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <label htmlFor="edit-image">Image</label>
        {editImage && <img src={`http://localhost:3001/uploads/${image}`} alt="Task" height={200} width={200}/>}
        {editImage ? <button onClick={() => setEditImage(false)} style={{margin: '10px'}}>Change Img?</button> 
        :
        <input
        type="file"
        accept="image/*"
        id="edit-image"
        onChange={handleImageChange}
      />
        }
       

        <button type="submit" className="edit-submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTask;
