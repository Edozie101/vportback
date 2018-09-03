import Joi from "joi";

import { responseMessages } from "../utils/messages";
import { errorCodes } from "../utils/statusCodes";
import { userTypes, truckTypes, roles } from "../utils/modelCostants";
import {
  validateEnumAValues,
  joiValidationErrorMessage,
  decodeToken
} from "../utils/helpers";

/**
 *  Helps to validate the payload for users signup
 * @param {object} req 
 * @param {object} res 
 * @param {method} next 
 */
export const signupValidator = (req, res, next) =>{
  const { userType, truckType, insurancePhoto } = req.body;
  let sigupSchemaSchema;

  //  Only drivers need this properties to signup
  if (truckType && userType && insurancePhoto) {
      req.body.role = roles[0];
      sigupSchemaSchema = Joi.object().keys({
        firstName: Joi.string().required().min(2),
        lastName: Joi.string().required().min(2),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        phoneNumber: Joi.string().required(),
        password: Joi.string().required().min(6),
        userType: Joi.string().required(),
        truckType: Joi.string().required(),
        insurancePhoto: Joi.string().min(5).required(),
        role: Joi.string().required().equal(roles[0])
      });

      if (!validateEnumAValues(userTypes, userType)) {
        return res.status(errorCodes.badRequest).json({
          message: responseMessages.USER_TYPE,
          allowedTypes: userTypes
        })
      }
        
      if (!validateEnumAValues(truckTypes, truckType)) {
        return res.status(errorCodes.badRequest).json({
          message: responseMessages.TRUCK_TYPE,
          allowedTypes: truckTypes
        })
      }
  } else {
    req.body.role = roles[1];
    sigupSchemaSchema = Joi.object().keys({
      firstName: Joi.string().required().min(2),
      lastName: Joi.string().required().min(2),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().required().min(6),
      role: Joi.string().required().equal(roles[1])
    });
  }

  Joi.validate(req.body, sigupSchemaSchema, (error, value) => {
    if(error) {
      return res.status(errorCodes.badRequest)
      .json({ message: joiValidationErrorMessage(error) });
    }

    req.body = value;
    next()
  });
};


/**
 *  Helps to validate the payload for users signup
 * @param {object} req 
 * @param {object} res 
 * @param {method} next 
 */
export const signinValidator = (req, res, next) => {  
  const { password } = req.body;
  const schemaKeys = { password: Joi.string().required().min(6) };
  const signinPayload = { password };
  const payloadBody = Object.keys(req.body)
    .map(element => element.toLowerCase());

  if(payloadBody.includes("email") && payloadBody.includes("phonenumber")) {
    return res.status(errorCodes.badRequest)
    .json({ message: responseMessages.INVALID_LOGIN_DETAILS })
  }

  Object.keys(req.body).find((key) => {
    if (key === "email") {
      signinPayload.email = req.body.email
      schemaKeys.email = Joi.string().email({ minDomainAtoms: 2 }).required();
      return;
    }
    
    if (key === "phonenumber") {
      signinPayload.phoneNumber = req.body.phoneNumber;
      schemaKeys.phoneNumber = Joi.string().regex(/(\d)+$/).required().length(11);
    }
  })
  
    Joi.validate(signinPayload, schemaKeys, (error, value) => {
    if(error) {
      return res.status(errorCodes.badRequest)
          .json({ 
            message: joiValidationErrorMessage(error)
          });
    }

    next()
  });
};


/**
 *  Validates user id
 * @param {object} req 
 * @param {object} res 
 * @param {method} next 
 */

 export const getResourceValidator = (req, res, next) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const decoded = decodeToken(authorization, res);

    validateResource(id, decoded.id, res);
    req.body.id = decoded.id;
    req.body.email = decoded.email;
    next();
 }

 const validateResource = (paramId, decodedId, res) => {
  
  Joi.validate(
    {id: paramId},
    Joi.object().keys({ id: Joi.number().integer().required() }),
    (error, value) => {
      if(error) {
        return res.status(errorCodes.badRequest)
        .json({ message: responseMessages.INVALID_USER_ID })
      }

      if (value.id !== decodedId) {
        return res.status(errorCodes.badRequest)
        .json({ message: responseMessages.UNAUTHORIZED })
      }
    });
 }

