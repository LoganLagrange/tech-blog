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
        // if (res.session.user) {
            // isLoggedIn = true;
        // }

        res.render("home", {
            loggedIn: isLoggedIn,
            posts: hbsPosts
        })
    })
})

module.exports = router;