const userService = require('../services').user;

module.exports = {
  createUser, 
  getUser,
  updateUser,
  deleteUser,
  getUserArticles,
};


async function createUser(req, res, next) {
  try {
      const data = req.body;
      const result = await userService.createUser(data);
      return res.status(201).json(result);
  } catch (error) {
      next(error)
  }
}

async function getUser(req, res, next) {
  try {
      const userId = req.params.userId;
      const result = await userService.getUser(userId);
      return res.status(200).json(result);
  } catch (error) {
      next(error)
  }
}

async function updateUser(req, res, next) {
  try {
      const userId = req.params.userId;
      const payload = req.body;
      const result = await userService.updateUser(userId, payload);
      return res.status(200).json(result);
  } catch (error) {
      next(error)
  }
}

async function deleteUser(req, res, next) {
  try{
      const userId = req.params.userId;
      const result = await userService.deleteUser(userId);
      return res.status(200).json(result);
  } catch (error) {
      next(error)
  }
}

async function getUserArticles(req, res, next) {
  try{
      const userId = req.params.userId;
      const result = await userService.getUserArticles(userId);
      return res.status(200).json(result);
  } catch (error) {
      next(error)
  }
}

