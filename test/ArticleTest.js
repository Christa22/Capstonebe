const request = require('supertest');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const index = require("../src/index");
const Article = require('../src/models/articleModel.js'); // import the Article model
chai.use(chaiHttp);

describe('createArticle', function() {
    it('should return a status of 200 and the saved article object when valid data is provided', function(done) {
        request('http://localhost:5500')
            .post('api/Article')
            .send({
                Title: 'Test Article',
                Topic: 'Testing',
                articleContents: 'This is a test article for testing purposes'
            })
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.Title === 'Test Article');
                assert(res.body.Topic === 'Testing');
                assert(res.body.articleContents === 'This is a test article for testing purposes');
                done();
            });
    });

    it('should return a status of 500 and an error message when invalid data is provided', function(done) {
        request('http://localhost:5500')
            .post('api/Article')
            .send({
                Title: '',
                Topic: '',
                articleContents: ''
            })
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                assert(res.body.message === '"Title" is not allowed to be empty');
                done();
            });
    });
});

describe('get All Articles', () => {
    beforeEach(async () => {
        // create some test articles to work with
        await Article.create({ title: 'Test Article 1', content: 'Test Content 1' });
        await Article.create({ title: 'Test Article 2', content: 'Test Content 2' });
    });

    afterEach(async () => {
        // clean up the test articles
        await Article.deleteMany({});
    });

    it('should return all articles', (done) => {
        chai.request(app)
            .get('api/Articles')
            .query({ max: 10 })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(2);
                done();
            });
    });

    it('should return a maximum of 2 articles', (done) => {
        chai.request(app)
            .get('Api/Articles')
            .query({ max: 2 })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(2);
                done();
            });
    });
});


describe('getArticle', () => {
    it('should return a single article', async() => {
        const req = { params: { id: '63ca9ecfb29252fcbae78962' } };
        const res = {
            send: (data) => {
                assert.deepEqual(data, [{ _id: '63ca9ecfb29252fcbae78962', title: 'Success is counted sweetest', content: 'And Still I Rise is author Maya Angelous third volume of poetry, published by Random House in 1978' }]);
            }
        };
        await Article.create({ _id: '63ca9ecfb29252fcbae78962', title: 'Success is counted sweetest', content: 'And Still I Rise is author Maya Angelous third volume of poetry, published by Random House in 1978' });
        await getArticle(req, res);
    });

    it('should return an error message', async() => {
        const req = { params: { id: '0000' } };
        const res = {
            send: (data) => {
                assert.deepEqual(data, { message: 'error happened! sorry' });
            }
        };
        await getArticle(req, res);
    });
});

describe('PUT or Update an Article', () => {
    let article;

    beforeEach(async () => {
        article = new Article({
            Title: 'Test Article',
            Topic: 'Test Topic',
            articleContents: 'Test contents'
        });
        await article.save();
    });

    afterEach(async () => {
        await Article.deleteMany();
    });

    it('should update an existing article', async () => {
        const res = await request(app)
            .put(`api/Article/63ca9ecfb29252fcbae78962`)
            .send({
                Title: 'Updated Title',
                Topic: 'Updated Topic',
                articleContents: 'Updated contents'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Data has been Updated!!' });

        const updatedArticle = await Article.findById(article._id);
        expect(updatedArticle.Title).toEqual('Updated Title');
        expect(updatedArticle.Topic).toEqual('Updated Topic');
        expect(updatedArticle.articleContents).toEqual('Updated contents');
    });

    it('should return an error message if the article is not found', async () => {
        const res = await request(app)
            .put('Api/article/invalid-id')
            .send({
                Title: 'Updated Title',
                Topic: 'Updated Topic',
                articleContents: 'Updated contents'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'error happened! sorry' });
    });
});



describe('Delete an Article', () => {
    it('should delete an existing article', (done) => {
        chai.request(app)
          .delete('Api/Article/63ca9ecfb29252fcbae78962')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('The Article has been deleted!');
            done();
          });
      });

  it('should return an error message if the article does not exist', (done) => {
    request(app)
      .delete('api/Article/63ca9ecfb29252fcbae78962')
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.message, 'The Article does not exit!');
        done();
      });
  });
});