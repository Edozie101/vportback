require("dotenv").config();

import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

import { errorCodes } from "./statusCodes";
import { responseMessages } from "./messages";

const secret = process.env.SECRET;


 /**
 *  Decode user token
 * 
 * @param {string} token 
 * 
 * @return {promise} 
 */
export const decodeToken = (token, res) => {

 return JWT.verify(token, secret, (error, decoded) => {
     if(error) {
       return res.status(errorCodes.forbidden)
         .json({message: 
           responseMessages.TOKEN_EXPIRED
           });
     }
     return decoded;
   })
 }


/**
 *  Validate enum values right before it hits the model
 * 
 * @param {array} arrayOfValues 
 * @param {string} valueToValidate 
 * 
 * @return {string} error messge
 */
export const validateEnumAValues = (arrayOfValues, valueToValidate) => {
  if (arrayOfValues.includes(valueToValidate)) {
    return true;
  }
  return false;
};

/**
 *  Hash password and return the hashed passwoed
 * 
 * @param {string} plainPassword 
 * 
 * @return {string} HashedPassword
 */
export const hashPassword = (plainPassword) => {
   const hashedPassword = bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
  return hashedPassword;
}


/**
 *  Generate token
 * 
 * @param {string} plainPassword 
 * 
 * @return {string} HashedPassword
 */
export const generateToken = (userObject) => {
  const { id, role, email } = userObject; 
  const token = JWT.sign({id, role, email}, secret, { expiresIn: "24h"});
  return token;
}

/**
 *  Composes messages from joi validation error message
 * 
 * @param {object} error 
 * 
 * @return {string} error messge
 */
export const joiValidationErrorMessage = (error) => {
  if (error.details[0].type === "string.regex.base") {
    return `${error.details[0].path[0]} is invalid.`;
  }
  return error.details[0].message.replace(/"/g, "");
}

/**
 *  Handes general database error in the app
 * 
 * @param {object} error 
 * 
 * @return {object} errorResponse with statuscode and message
 */
export const handleError = (error) => {
  const errorReponse = {};

  switch(error.name) {
    case "SequelizeUniqueConstraintError": {
      errorReponse.message = error.errors[0].message,
      errorReponse.statusCode = errorCodes.conflict
    };
    break;
    default: {
      errorReponse.message = responseMessages.SERVER_ERROR
      errorReponse.statusCode = errorCodes.serverError
    }
  }

  return errorReponse;
};