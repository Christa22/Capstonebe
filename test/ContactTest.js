const chai = require("chai");
const expect = require("chai").expect();
const chaiHttp = require("chai-http");
const index = require("../src/index");
const should = chai.should();
chai.use(chaiHttp);

describe("Testing messages Api", () => {
  /**
   * testing get all blogs routes
   */
  it("It will hold all messages from users", (done) => {
    chai
      .request(index)
      .get("/Api/Articles/all")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("It will hold single message", (done) => {
    const param = "63ca931d68c1f2d2455eb6e4";
    chai
      .request(index)
      .get("/Api/messages/"+ param)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
   
  it("It should delete the message with matching id by authorized user", (done) => {
    const param = "63ca931d68c1f2d2455eb6e4";
    chai
      .request(index)
      .delete("/Api/messages/message/" + param)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});