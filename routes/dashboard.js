const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const Exercise = require('../models/exercise');
const Task = require('../models/task');
const user = require('../models/user');

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.use(userController.redirectIfNotAuth);

router.get('/', (req, res) => {
    res.render('dashboard');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/therapist', (req, res) => {
    res.render('therapist');
});

router.get('/exercises', async (req, res) => {
    let exercises = await Exercise.find({}).exec();
    res.render('exercises', {
        exercises: exercises
    });
});

router.post('/exercises', userController.completeTask);

router.get('/tasks', async (req, res) => {
    let tasks = await Task.find({
        user: req.user._id
    }).exec();
    res.render('tasks', {
        tasks: tasks
    });
});

router.post('/tasks', userController.completeTask);

module.exports = router;