const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/user');

router.route('/login')
    .all(userController.redirectIfAuth)
    .get((req, res) => {
        res.render('login');
    })
    .post(
        passport.authenticate('local', {
            failureRedirect: '/login?error=unknown',
            failureFlash: true
        }),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );

router.post('/register', userController.register);

router.get('/logout', userController.logout);

module.exports = router;