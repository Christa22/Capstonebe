import { doesNotMatch } from "assert";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
const request = require('supertest');
import app from "../src/index.js";

chai.use(chaiHttp);

describe('Testing get all Articles endpoint', ()=>{

    it('It should return all Public Articles',(done)=>{
        setTimeout(done,500)
        try{
            chai.request(app)
            .get('/api/Articles') 
            .end((error,res) =>{
              //res.should.have.status(200);
              var body = res.body;
              expect(body).to.contain.property('Data');

             done();

            })
        }catch(error){
           done(error);
        }
    })
})

// Get single Article

describe('Testing get single article endpoint', () => {
    it('it should GET single Article', (done) => {
        setTimeout(done,500)
      chai.request(app)
        .get('/api/Article/63ca939f68c1f2d2455eb6e8') 
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('Article');
          done();
        });
    });
});

//Create Article

describe('Create Article Endpoint', () => {
    it('creates a new article', (done) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        chai.request(app)
          .post('/api/Article')
          .set({ 'token': token, Accept: 'application/json' })
          .send({
            Title: "The best technologies to learn this year",
            Topic: "nodejs, reactjs, and mocha",
            articleContents: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          })
          .then((res) => {
            const body = res.body;
            if (res.status === 200) {
              expect(body).to.contain.property('error');
            } else if (res.status === 400) {
              expect(body).to.contain.property('data');
              expect(body).to.contain.property('message');
            }
            done();
          })
          .catch((err) => done(err))
      });
});


/// Update the Article
describe('Update Article', () => {
  it('It should return Update Article',(done)=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    chai.request(app)
    .put('/api/Article')
    .set({'token': token ,Accept :'application/json'})
    .send({
      Title: "The best technologies ",
              Topic: "nodejs, reactjs, and mocha",
              articleContents: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    })
    .then((res)=>{
      const body =res.body;
      if(res.status ===20) {
        expect(body).to.contain.property('error');
      }else if (res.status ===400) {
        expect(body).to.contain.property('data');
        expect(body).to.contain.property('message');
  
      } 
      done();
    })
    .catch((err) => done(err))
  });
  
  });


// Delete Article
describe('Delete Article', () => {
  it('It should return Delete Article', (done) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    chai.request(app)
      .delete('/api/Article/:id')
      .set({ 'token': token, Accept: 'application/json' })
      .then((res) => {
        const body = res.body;
        if (res.status === 200) {
          expect(body).to.contain.property('message');
        } else if (res.status === 400) {
          expect(body).to.contain.property('error');
        }
        done();
      })
      .catch((err) => done(err));
  });
});

//Create comment
describe('POST Comment ', () => {
  it('should create a new comment for a specific article', (done) => {
    request(app)
      .post(`/api/Comment?blogId=63cab7ff8f08b59f051ff475`)
      .send({
        name: 'John Doe',
        comment: 'This is a great article!!, hope to get more inspiring ones like this.'
      })
      .expect(200)
      .expect((res) => {
        const body = res.body;
        // Check if the response has the created comment
        assert.property(body, 'comment');
        assert.property(body.comment, 'name');
        assert.property(body.comment, 'comment');
        assert.equal(body.comment.name, 'John Doe');
  
        assert.equal(body.comment.comment, 'This is a great article');
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  }, 10000);
});




// get comment

describe('GET Comment ', () => {
  it('should return a list of comments for a specific article', (done) => {
    request(app)
      .get(`/api/Comment/:id`)
      .expect(200)
      .expect((res) => {
        // Make sure that the response is an array of comments
        assert.isArray(res.body);
  
        // Make sure that each comment has the correct properties
        res.body.forEach((comment) => {
          assert.property(comment, 'name');
          assert.property(comment, 'articleId');
          assert.property(comment, 'comment');
        });
      })
      .end(done);
  }, 10000);

});
