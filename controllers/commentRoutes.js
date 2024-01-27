const express = require(`express`);
const router = express.Router();
const {Comment, User} = require(`../models`);

// CREATE new comment
router.post('/', (req, res) => {
    console.log(req.body)
    Comment.create({
        contents: req.body.contents,
        user_id: req.session.user.id,
        post_id: req.body.postId
    }).then(newComment => {
        res.json(newComment);
    }).catch(err => {
        res.status(500).json({msg:`Server error!`, err});
    })
})

// GET all comments for given post
router.get(`/onpost/:id`, (req,res) => {
    Comment.findAll({
        where: {
            post_id: req.params.id
        },
        include:[{
            model: User,
            attributes: [`username`]
        }]
    }).then(dbComment => {
        res.json(dbComment);
    }).catch(err => {
        console.log('error creating comment', err)
        res.status(500).json({msg:`Server error!`, err});
    })
});



module.exports = router;