const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

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

router.get('/track', (req, res) => {
    res.render('track');
});


module.exports = router;