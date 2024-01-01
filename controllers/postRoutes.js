const express = require(`express`);
const router = express.Router();
const {Post} = require(`../models`);

router.get(`/`, (req,res)  => {
    Post.findAll().then(dbPost => {
        res.json(dbPost);
    }).catch(err => {
        res.status(500).json({msg:`Server error!`, err});
    })
})

// GET route for all post owner by a given user
router.get("/userposts/:id", (req, res) => {
    Post.findAll({
        where: {
            postId: req.params.id
        }
    }).then(dbPost => {
        res.json(dbPost);
    }).catch(err => {
        res.status(500).json({msg:`Server error!`, err})
    })
})

module.exports = router;