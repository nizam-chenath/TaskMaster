const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const upload = require('../middlewares/upload');


//Add task 
router.post('/add', upload.single('image'), taskController.createTask);
router.put('/:id', upload.single('image'), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/:id', taskController.getTaskById);
router.get('/', taskController.getAllTasks);

module.exports = router;
