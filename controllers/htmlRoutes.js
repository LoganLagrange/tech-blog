const express = require(`express`);
const router = express.Router();
const { User, Post, Comment } = require(`../models`);

router.get("/", (req, res) => {
    Post.findAll({
        include: [{
            model: User,
            attributes: ["username"]
        }]
    }).then(dbPost => {
        const hbsPosts = dbPost.map((post) => post.toJSON());
        let isLoggedIn = false
        if (req.session.user) {
            isLoggedIn = true;
        }
        console.log(isLoggedIn)
        res.render("home", {
            loggedIn: isLoggedIn,
            posts: hbsPosts
        })
    })
})

router.get('/login', (req, res) => {
    if(req.session.user) {
        res.redirect("/dashboard");
    } else {
        res.render("auth", {
            isLogin: true,
            loggedIn: false
        })
    }
})

router.get('/signup', (req, res) => {
    if(req.session.user) {
        res.redirect("/dashboard");
    } else {
        res.render("auth", {
            isLogin: false,
            loggedIn: false
        })
    }
})

router.get("/dashboard", (req, res) => {
    console.log(req.session.user.id)
    Post.findAll({
        where: {
            userId: req.session.user.id
        },
        include: [{
            model: User,
            attributes: ["username"]
        }]
    }).then(dbPosts => {
        const hbsPosts = dbPosts.map((post) => post.toJSON());
        if(!req.session.user) {
            res.redirect("/")
        } else {
            res.render("dashboard", {
                loggedIn: true,
                posts: hbsPosts
            })
        }
        
    })
})
module.exports = router;