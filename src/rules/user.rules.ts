import * as bcrypt from 'bcrypt'
import { check } from 'express-validator/check'
import { User, UserModel } from '../models/user'

export const userRules = {

    forRegister: [
        check('email')
          .isEmail().withMessage('Invalid email format')
          .custom(email => User.findAndCountAll({ where: { email } }).then(u => {
              if (u.count) {
                return Promise.reject('E-mail is in use already')
              }
          })).withMessage('Email exists'),
        check('password')
          .isLength({ min: 2 }).withMessage('Invalid password'),
        check('confirmPassword')
          .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Passwords are different')
      ],
      forLogin: [
        check('email')
        .isEmail().withMessage('Invalid email format')
        .custom(email => User.findOne({ where: { email } }).then(u => !!u)).withMessage('Invalid email or password'),
      check('password')
        .custom((password, { req }) => {
          return User.findOne({ where: { email: req.body.email } })
            .then(u => bcrypt.compare(password, u!.password))
        }).withMessage('Invalid email or password')
      ]
}