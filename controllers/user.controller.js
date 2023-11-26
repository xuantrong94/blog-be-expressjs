const UserModel = require('../models/user.model');
const RoleModel = require('../models/role.model');

const updateUserInfo = async (req, res) => {
  const { username, password, email, avatar, fullName } = req.body;
  const { id } = req.params;
  try {
    const updatedUser = {
      username,
      password,
      email,
      avatar,
      fullName,
    };
    await UserModel.findByIdAndUpdate(id, updatedUser, { new: true })
      .populate('role')
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (error) {}
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(201).json({
      success: true,
      message: 'User role updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { updateUserInfo, updateUserRole, getUsers };
