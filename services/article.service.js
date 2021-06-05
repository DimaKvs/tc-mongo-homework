'use strict';

const User = require('../models/user');
const Article = require('../models/article');

const { badRequest } = require('../config/errorHelper');

module.exports = {
    createArticle,
    updateArticle,
    getArticle,
    deleteArticle
}

async function createArticle(data) {
    const targetUser = await User.findOne({_id: data.owner});
    if (!targetUser) {
        throw badRequest('User not exists')
    }
    const article = await Article.create(data);
    
    targetUser.numberOfArticles++;
    await targetUser.save();
    return article;
}

async function updateArticle(articleId, payload) {
    const article = await Article.findById(articleId);

    if (!article) {
        throw badRequest('Article not exists')
    }
                                                // can change owner (though its sanseless)
    if(payload.hasOwnProperty('owner')){        // if owner field passed to HTTP body, 
        if(article.owner != payload.owner){      // check if new owner != current 
            
            const newArticleOwner = await User.findOne({_id: payload.owner});
            const currentArticleOwner = await User.findOne(article.owner);

            if(!newArticleOwner){
                throw badRequest('User not exists')
            } 
            newArticleOwner.numberOfArticles++; 
            currentArticleOwner.numberOfArticles--;
            await newArticleOwner.save();
            await currentArticleOwner.save();
        }
    }
    
    Object.entries(payload || {}).forEach(([key, value]) => {
        if ([
            'title',
            'subtitle',
            'description',
            'owner',
            'category'
        ].includes(key)) article[key] = value || undefined;
    });

    await article.save();
    return article;
}

async function getArticle(query) {
    const filters = ['title', 'subtitle', 'description', 'owner', 'category', 'createdAt', 'updatedAt']
    
    if(!filters.includes(Object.keys(query)[0])){
        throw badRequest('Invalid filter')
    }
    if(query.hasOwnProperty('title')){
        const result = await Article.find( { $text: { $search: query.title} } ).populate('owner', 'firstName lastName role numberOfArticles nickName createdAt');;
        return  result;
    }

    const result = await Article.find({...query}).populate('owner', 'firstName lastName role numberOfArticles nickName createdAt');
    return result;
}

async function deleteArticle(articleId) {

    const article =  await Article.findById(articleId);
    
    if(!article){
        throw badRequest('Article not exists');
    }

    const user = await User.findById(article.owner);
    user.numberOfArticles--;
    await user.save();

    const result = await Article.findByIdAndRemove(articleId);
    return result;
}
