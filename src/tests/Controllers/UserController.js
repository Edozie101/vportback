require('dotenv').config();

import server from "../../../index";
import supertest from "supertest";
import chai from "chai";
import { responseMessages } from "../../utils/messages";
import { errorCodes, successCodes } from "../../utils/statusCodes";

const APItoken = process.env.API_TOKEN;
const expect = chai.expect;
const app = supertest(server);

describe("Vport API", () => {

  it("should return an errror if no api token is supplied", (done) => {
    app.get("/")
      .set("Content-Type", "application/json")
      .end((error, res) => {
        expect(res.status).to.equal(errorCodes.forbidden)
        expect(res.body.message).to.equal(responseMessages.INVALID_API_TOKEN);
        done();
      });
  });

  it("should welcome user to api", (done) => {
    app.get("/")
      .set("Content-Type", "application/json")
      .set("api_token", APItoken)
      .end((error, res) => {
        expect(res.status).to.equal(successCodes.ok)
        expect(res.body.message).to.equal(responseMessages.WELCOME);
        done();
      });
  });
})