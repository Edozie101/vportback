import express from "express";
import UserController from "../controllers/UserController";
import { responseMessages } from "../utils/messages";
import {
    signupValidator,
    signinValidator,
    getResourceValidator
  } from "../middlewares";

const appRouter = express.Router();

const driverAPI = "/drivers";
const userAPI = "/users";

appRouter.get("/", (req, res) => {
  res.status(200)
    .json({message: responseMessages.WELCOME})
});


/********************************************************/
/******ROUTE THAT INTERSECTS DRIVERS AND userS**********/
/********************************************************/
appRouter.post("/signin", signinValidator, UserController.signIn);

appRouter.post(`/signup`, signupValidator, UserController.signUp);

appRouter.route("/users/:id")
  .get(getResourceValidator, UserController.getUser)
  .put(getResourceValidator, UserController.updateUser)
  .delete(getResourceValidator, UserController.deleteUser);


/****************************/
/*********DRIVER ROUTES**** */
/****************************/
// routes here

/****************************/
/*********user ROUTES**** */
/****************************/
/****************************/
// routes here
  
/****************************/
/*********INVALID ROUTES*****/
/****************************/

appRouter.route("*")
  .get((req, res) => {
  res.status(404)
    .json({message: responseMessages.NON_EXISTENT_ROUTE})
  })
  .post((req, res) => {
    res.status(404)
      .json({message: responseMessages.NON_EXISTENT_ROUTE
      }); 
})
  .put((req, res) => {
  res.status(404)
    .json({message: responseMessages.NON_EXISTENT_ROUTE
    }); 
})

.delete((req, res) => {
  res.status(404)
    .json({message: responseMessages.NON_EXISTENT_ROUTE
    }); 
});

export default appRouter;