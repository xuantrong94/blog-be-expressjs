const UserModel = require('../models/user.model');
const RoleModel = require('../models/role.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password, email, avatar, fullName } = req.body;
  try {
    // get and set default role = 'user'
    const userRoleId = '656380a433ab4482dd47b78c';
    // check if username or email is existing
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      avatar,
      fullName: fullName || username,
      role: userRoleId,
    });
    UserModel.create(newUser);
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    // create accessToken
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );
    // create refreshToken
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // save refreshToken to database
    user.refreshToken = refreshToken;
    await user.save();
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      accessToken,
      refreshToken,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login };
