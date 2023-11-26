const RoleModel = require('../models/role.model');

const createRole = (req, res) => {
  const { name, level } = req.body;
  try {
    const newRole = new RoleModel({ name, level });
    newRole
      .save()
      .then((role) => {
        res.status(201).json(role);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (error) {}
};

module.exports = { createRole };
