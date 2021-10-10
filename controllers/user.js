const User = require('../models/user');
const Task = require('../models/task');
const Exercise = require('../models/exercise');

module.exports.register = async (req, res) => {
    let user = await User.find({
        email: req.body.email
    }).exec();

    if ( user.length > 0 ) {
        res.redirect('/login?action=sign-up&error=exists');
    }

    User.register(
        new User({
            name: req.body.name,
            phone: req.body.phone,
            username: req.body.email
        }),
        req.body.password,
        (err) => {
            if ( err ) {
                console.log(err);
                res.redirect('/login?action=sign-up&error=unknown');
            } else {
                res.redirect('/dashboard');
            }
        }
    );
}

module.exports.logout = async (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.checkAuth = (req) => {
    if ( req.user ) {
        return true;
    }
    return false;
}

module.exports.redirectIfAuth = (req, res, next) => {
    if ( this.checkAuth(req) ) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

module.exports.redirectIfNotAuth = (req, res, next) => {
    if ( !this.checkAuth(req) ) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports.completeExercise = async (req, res) => {
    let exercise = Exercise.findOne({
        _id: req.body.id
    });

    if ( !exercise ) {
        res.redirect('/dashboard/exercises');
        return;
    }

    req.user.completedExercises.push(exercise._id);
    await req.user.save();
    res.redirect('/dashboard/exercises');
}

module.exports.addTask = async (req, res) => {
    let task = new Task({
        name: req.body.name,
        description: req.body.description,
        user: req.user._id
    });
    await task.save();
    res.redirect('/dashboard/tasks');
}

module.exports.completeTask = async (req, res) => {
    await Task.findOneAndUpdate({
        _id: req.body.id
    }, {
        completed: true
    }).exec();
    res.redirect('/dashboard/tasks');
}