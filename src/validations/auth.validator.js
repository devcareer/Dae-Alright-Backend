import { check } from 'express-validator';

export default {
  userSignupSchema: [
    check('firstName')
      .trim()
      .exists()
      .withMessage('first name is required')
      .isLength({ min: 2, max: 15 })
      .withMessage('first name should be between 2 to 15 characters')
      .matches(/^(\w+\s?)*\s*$/)
      .withMessage('first name should only contain alphabets and non-consecutive spaces')
      .customSanitizer(value => value.toLowerCase()),

    check('lastName')
      .trim()
      .exists()
      .withMessage('last name is required')
      .isLength({ min: 2, max: 15 })
      .withMessage('last name should be between 2 to 15 characters')
      .matches(/^(\w+\s?)*\s*$/)
      .withMessage('last name should only contain alphabets and non-consecutive spaces')
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

    check('address')
      .optional()
      .trim()
      .customSanitizer(value => value.toLowerCase()),
  ],

  vendorSignupSchema: [
    check('name')
      .trim()
      .exists()
      .withMessage('name is required')
      .isLength({ min: 2, max: 25 })
      .withMessage('name should be between 2 to 25 characters')
      .matches(/^(\w+\s?)*\s*$/)
      .withMessage('name should only contain alphabets and non-consecutive spaces')
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

  signinSchema: [
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

  emailSchema: [
    check('email')
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('Enter a valid email address')
      .customSanitizer(email => email.toLowerCase()),
  ],

  passwordSchema: [
    check('password')
      .trim()
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('Password should be between 8 to 15 characters')
  ]
};
