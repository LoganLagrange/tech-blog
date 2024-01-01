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
    Post.findAll({
        where: {
            userId: req.session.user.id
        }
    }).then(dbPosts => {
        if(!req.session.user) {
            res.redirect("/")
        } else {
            res.render("dashboard", {
                loggedIn: true,
                posts: dbPosts
            })
        }
        
    })
})
module.exports = router;