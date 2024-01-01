const express = require('express');
const router = express.Router();
const bcrypt = require(`bcrypt`);
const { User } = require('../models'); // Imports the User model

// CREATE new user
router.post(`/`, (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(newUser => {
        req.session.user = {
            id: newUser.id
        }
        res.json(newUser)
    }).catch(err => {
        res.status(500).json({ msg: `Server Error!`, err });
    })
});

// POST route for user login
router.post('/login',(req, res) => {
        User.findOne({
            where: {
                username: req.body.username, // Assuming username is used for login
            }
        }).then(foundUser => {
            if (!foundUser) {
                return res.status(401).json({ message: 'Incorrect username or password!' });
            } else if (!foundUser.checkPassword(req.body.password)) {
                return res.status(401).json({ message: 'Incorrect username or password!' });
            }
    
            req.session.user = {
                id: foundUser.id,
                username: foundUser.username
            };
    
            res.json({ userId: req.session.user.id, username: req.session.user.username });
        }).catch(err => {
            res.status(500).json({msg:"Server error!", err})
        })
    });

// DELETE route for user logout
router.delete('/logout', (req, res) => {
    console.log('Session before destroy:', req.session);
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                // error case
                console.error('asychnronous session destruction occured', err);
                res.status(500).json({ message: 'Error during logout' });
            } else {
                // logout successful
                res.clearCookie(`connect.sid`, { path: '/', maxAge: 0, expires: new Date(0) })
                console.log('Session after destroy:', req.session);
                res.status(200).json({ message: 'Logout Successful' });
            }
        });
    } else {
        // session timeout case
        res.status(404).json({ message: 'No active session found' });
    }
});

module.exports = router;