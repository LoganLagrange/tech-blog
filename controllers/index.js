const express = require(`express`);
const router = express.Router();

const userRoutes = require(`./userRoutes`)
router.use(`/api/users`,userRoutes);

const postRoutes = require(`./postRoutes`)
router.use(`/api/posts`,postRoutes);

const commentRoutes = require(`./commentRoutes`)
router.use(`/api/comments`,commentRoutes);

const htmlRoutes = require(`./htmlRoutes`)
router.use(`/`,htmlRoutes);


module.exports = router;