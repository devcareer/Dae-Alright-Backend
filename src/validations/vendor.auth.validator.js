import { check } from 'express-validator';

export default {
  vendorSignupSchema: [
    check('name')
      .trim()
      .exists()
      .withMessage('name is required')
      .isLength({ min: 2, max: 15 })
      .withMessage('name should be between 2 to 15 characters')
      .isAlpha()
      .withMessage('name should only contain alphabets')
      .customSanitizer(value => value.toLowerCase()),

    check('email')
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('email is not valid')
      .customSanitizer(email => email.toLowerCase()),

    check('password')
      .trim()
      .exists()
      .withMessage('password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('password should be between 8 to 15 characters'),

    check('phone')
      .trim()
      .exists()
      .withMessage('Phone number is required')
      .matches(/^[0-9]{6,11}$/)
      .withMessage('enter a valid phone number'),

    check('location')
      .optional()
      .trim()
      .customSanitizer(value => value.toLowerCase()),
  ],

  vendorSigninSchema: [
    check('email')
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('email is not valid')
      .customSanitizer(email => email.toLowerCase()),

    check('password')
      .trim()
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('Password should be between 8 to 15 characters'),
  ],
};
