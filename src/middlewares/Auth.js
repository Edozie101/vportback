require("dotenv").config();

import JWT from "jsonwebtoken";
import messages from "../utils/messages";
import {errorCodes} from '../utils/statusCodes';

const secret = process.env.SECRET;

class Auth {
  /**
   * Thia validates API token. This token should 
   * only be given by one of the devs
   */
 static validateAPIAccessToken(req, res, next) {
   const {api_token} = req.headers;
   
    JWT.verify(api_token, secret, (error, decoded) => {
      if(error) {
        return res.status(errorCodes.forbidden)
          .json({message: 
              messages.INVALID_API_TOKEN
            });
      }
      next();
    })
  }

};

export default Auth;

