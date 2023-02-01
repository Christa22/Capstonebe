import { doesNotMatch } from "assert";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
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


/*Update the Article
describe('Update the Article', () => {
  it('should update an article', (done) => {
    const id = '63ca939f68c1f2d2455eb6e8';
    const updatedArticle = {
      Title: 'Mum, I made it!!',
      Topic: 'Poetry',
      articleContents: 'New article contents'
    };

    chai.request(app)
      .put(`api/Article/63ca939f68c1f2d2455eb6e8`)
      .send(updatedArticle)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').that.equals('Data has been Updated!!');
        done();
      });
  });
});*/
/*Delete 

describe('Delete Article', () => {
  it('should delete an article', (done) => {
    chai.request(app)
      .delete('/api/Article/:63d403c7fb3393f2fc33d223')
      .end((err, res) => {
        if (err) { // Added error handling
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The Article has been deleted!');
        done();
      });
  });
});*/



//Get signle comment

describe('Testing Get single comment endpoint', () => {
    it('it should get single comment', (done) => {
        setTimeout(done,500)
      chai.request(app)
        .get('/api/Comment/:63ca939f68c1f2d2455eb6e8')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('comment');
          done();
        });
    });
});