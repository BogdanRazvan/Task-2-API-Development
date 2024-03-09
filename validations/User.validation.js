const { body, validationResult } = require('express-validator');
const User = require('../models/User.model');

const validateUpdateUser = [
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('age').trim().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

  const validateCreateUser = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    ...validateUpdateUser
  ];
  

module.exports = { validateCreateUser, validateUpdateUser };