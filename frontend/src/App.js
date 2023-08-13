import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddTask from './components/AddTask/AddTask.jsx';
import EditTask from './components/EditTask/EditTask.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import TaskDetails from './components/TaskDetails/TaskDetails.jsx';

import './index.css';

function App() {
  return (
    <>
     <Routes>
      
      <Route exact path="/" element={<TaskList/>} />
      <Route path="/add" element={<AddTask/>} />
      <Route path="/edit/:id" element={<EditTask/>} />
      <Route path="/task/:id" element={<TaskDetails/>} />
   
  </Routes>
    </>
   
  );
}

export default App;
