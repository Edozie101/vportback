require("dotenv").config();

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import socket from 'socket.io';

import SocketController from "./src/controllers/SocketController";
import appRouter from "./src/routes/";

const port = process.env.PORT;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false }));
app.use(appRouter);


const appServer = app.listen(port, (error) => {
  if(error) {
   return res.json({ error })
  }
  console.log("app started on port:" + port);
});

// Pass on the server to socket
SocketController.onConnet(socket(appServer));

export default app;