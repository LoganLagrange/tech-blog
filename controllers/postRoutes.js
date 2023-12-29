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

module.exports = router;