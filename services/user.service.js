'use strict';
const User = require('../models/user');
const Article = require('../models/article');

const { badRequest } = require('../config/errorHelper');

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUserArticles,
}

async function createUser(data) {
    const result = await User.create(data);
    return result;
}

async function getUser(userId) { //--------------Add populate
    const user = await User.findById(userId);//.populate('articles', 'title subtitle description owner category createdAt');

    if (!user) {
        throw badRequest('User not exists')
    }
    
    const usersArticles = await Article.find({owner: userId})
    const modifiedArticles = usersArticles.map(doc => {
        return  ( ({title, description, category, subtitle, createdAt}) => ({title, description, category, subtitle, createdAt}) )(doc);
    });
    
    const result = {
        user,
        articles: modifiedArticles
    }
    return result;
}

async function updateUser(userId, payload) {
    const user = await User.findById(userId);

    if (!user) {
        throw badRequest('User not exists')
    }

    Object.entries(payload || {}).forEach(([key, value]) => {
        if ([
            'firstName',
            'lastName',
            'role',
            'nickName',
        ].includes(key)) user[key] = value || undefined;
    });

    await user.save();
    return user;
}

async function deleteUser(userId) {
    const user = await User.findById(userId);

    if(!user){
        throw badRequest('User not exists')
    }

    await Article.deleteMany({owner: userId});
    const result = await User.findByIdAndRemove(userId);
    return result;
}   

async function getUserArticles(userId) {
    const user = await User.findById(userId);

    if(!user){
        throw badRequest('User not exists')
    }
    const result = await Article.find({owner: user});
    return result;
}

