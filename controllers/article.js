const articleService = require('../services').article;

module.exports = {
    createArticle,
    updateArticle,
    getArticle,
    deleteArticle
};

async function createArticle(req, res, next) {
    try {
        const data = req.body;
        //console.log(req.body);
        const result = await articleService.createArticle(data);
        return res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

async function updateArticle(req, res, next) {
    try {
        const articleId = req.params.articleId;
        const payload = req.body;
        const result = await articleService.updateArticle(articleId, payload);
        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

async function getArticle(req, res, next) {
    try {
        const query = req.query;
        const result = await articleService.getArticle(query);
        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

async function deleteArticle(req, res, next) {
    try {
        const id = req.params.articleId;
        const result = await articleService.deleteArticle(id);
        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}