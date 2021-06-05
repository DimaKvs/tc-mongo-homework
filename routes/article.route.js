const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle);

router
    .put('/:articleId', articleController.updateArticle)
    .delete('/:articleId', articleController.deleteArticle)

router.get('/', articleController.getArticle)



module.exports = router;