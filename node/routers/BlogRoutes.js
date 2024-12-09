const express = require('express');
const { addBlog, allBlog, singleBlog } = require('../controllers/BlogControllers');
const router = express.Router();

router.route('/').post(addBlog).get(allBlog)
router.route('/blog/:id').get(singleBlog)

module.exports = router;