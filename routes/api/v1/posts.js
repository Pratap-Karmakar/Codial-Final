const express = require('express');
const router = express.Router();

const postApi = require('../../../controller/api/v1/posts_api');

router.get('/', postApi.index);

// to delete a post
router.delete('/:id',postApi.destroy);

module.exports = router;