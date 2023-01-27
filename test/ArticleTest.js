const chai = require("chai");
const expect = require("chai").expect();
const chaiHttp = require("chai-http");
const Article = require("../src/models/articleModel");
const index = require("../src/index");
const should = chai.should();
chai.use(chaiHttp);

describe("Testing Article Api", () => {
  /**
   * testing get all Articles routes
   */
  it("It'll get all Articles", (done) => {
    chai
      .request(index)
      .get("/Api/Article/all")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("It'll get single Article", (done) => {
    const param = "63ca931d68c1f2d2455eb6e4";
    chai
      .request(index)
      .get("/Api/Articles/"+ param)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
   
  it("it should delete the blog with matching id by authorized user", (done) => {
    const param = "63ca931d68c1f2d2455eb6e4";
    chai
      .request(index)
      .delete("/Api/Articles/Article/" + param)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  /**
   * Testing authorized update single Articleroutes
   */
  it("It'll update the Article with matching id by authorized user", (done) => {
    const param = "63ca931d68c1f2d2455eb6e4";
    const Article = {
      title: "testing Article",
      category: "tests",
    };
    chai
      .request(index)
      .patch("/Api/Articles/Article/" + param)
      .send(Article)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});