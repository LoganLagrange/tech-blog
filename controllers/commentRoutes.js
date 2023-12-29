const express = require(`express`);
const router = express.Router();
const {Comment, User} = require(`../models`);

// GET all comments for given post
router.get(`/onpost/:id`, (req,res) => {
    Comment.findAll({
        where: {
            postId: req.params.id
        },
        include:[{
            model: User,
            attributes: [`username`]
        }]
    }).then(dbComment => {
        res.json(dbComment);
    }).catch(err => {
        res.status(500).json({msg:`Server error!`, err});
    })
});

module.exports = router;