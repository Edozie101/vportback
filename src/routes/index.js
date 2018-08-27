import express from "express";
import UserController from "../controllers/UserController";
import messages from "../utils/messages";

const appRouter = express.Router();


appRouter.get("/", (req, res) => {
  res.status(200)
    .json({message: messages.WELCOME})
});

appRouter.get("/signin",
UserController.signIn);

appRouter.post("/signup",
UserController.signUp);

appRouter.route("/user/:id")
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

appRouter.route("*")
  .get((req, res) => {
  res.status(404)
    .json({message: messages.NON_EXISTENT_ROUTE})
  })
  .post((req, res) => {
    res.status(404)
      .json({message: messages.NON_EXISTENT_ROUTE
      }); 
})
  .put((req, res) => {
  res.status(404)
    .json({message: messages.NON_EXISTENT_ROUTE
    }); 
})

.delete((req, res) => {
  res.status(404)
    .json({message: messages.NON_EXISTENT_ROUTE
    }); 
});

export default appRouter;