const router = require('express').Router();
const Task = require('../models/Task');

// Get all tasks
router.route('/tasks').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new task
router.route('/tasks/add').post((req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description });

  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a task
router.route('/tasks/update/:id').put((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.completed = !task.completed;

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a task
router.route('/tasks/delete/:id').delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
