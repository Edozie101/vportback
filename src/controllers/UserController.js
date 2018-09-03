import bcrypt from "bcrypt/";

import models from "../models/";
import { successCodes, errorCodes } from "../utils/statusCodes";
import { responseMessages } from "../utils/messages";
import { userAttributes } from "../utils/modelCostants";
import { hashPassword, handleError, generateToken } from "../utils/helpers";

const User = models.User;

class UserController {

  /**
   * Handles user signup
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static signUp(req, res) {
    req.body.password = hashPassword(req.body.password);

    User.create(req.body)
    .then((user) => {
      const { id, role, email } = user.dataValues;
      const userInfo = { id, role, email }

      res.status(successCodes.ok)
        .json({ 
          message: responseMessages.ACCOUNT_CREATED,
          token: generateToken(userInfo),
          user: userInfo
        });
    })
    .catch((error) => {
      const beautifiedError = handleError(error);

      res.status(beautifiedError.statusCode)
        .json({ message: beautifiedError.message })
    });
  }

  /**
   * Signs a user in
   *
   * @static
   * 
   * @param {object} req
   * @param {object} res
   * 
   * @memberof AccessController
   */
  static signIn(req, res) {
    const { password } = req.body;

    let query = {};

    if (req.body.email) {
      query["email"] = req.body.email;
    } else {
      query["phoneNumber"] = req.body.phoneNumber;
    }

    User.findOne({ where:  query  })
    .then((userDetails) => {

      if (userDetails !== null 
          && bcrypt.compareSync(password, userDetails.dataValues.password)) {

        const { id, email, role } = userDetails.dataValues;

        return res.status(successCodes.ok)
          .json({
            message: responseMessages.LOGGED_IN,
            token: generateToken({id, email, role }),
            id
            });
      } 
        return res.status(errorCodes.notFound).json({
            message: responseMessages.USER_NOT_FOUND
          });    
    });
  }


   /**
   * Fetches a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static getUser(req, res) {
    const { id, email } = req.body;

    User.findById(id, { where: { email }, attributes: userAttributes })
      .then((userDetails) => {
        if (!userDetails) {
          return res.status(errorCodes.notFound).json({
              message: responseMessages.USER_NOT_FOUND
            });
        }

        res.status(successCodes.ok).json({userDetails});

    })
    .catch((error) => {
      res.send(error);
    })
  }

  /**
   * Fetches a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static updateUser(req, res) {
    return res.json({ message: req.body });
  }

   /**
   * Fetches a user
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof AccessController
   */
  static deleteUser(req, res) {
    return res.json({ message: req.body });
  }
}

export default UserController;