const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);

router
    .get('/:userId', userController.getUser)
    .put('/:userId', userController.updateUser)
    .delete('/:userId', userController.deleteUser)
    
router.get('/:userId/articles', userController.getUserArticles)

module.exports = router;