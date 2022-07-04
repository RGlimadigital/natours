const express = require('express');

const {
  checkUserBody,
  checkUserId,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');
// ==== ROTAS ====
const router = express.Router();
router.param('id', checkUserId);
router.route('/').get(getAllUsers).post(checkUserBody, createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
