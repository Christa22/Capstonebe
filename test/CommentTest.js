const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const Comment = require('../src/models/CommentsModel');

describe('createComments', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Donna',
                comment: 'Great article!!'
            },
            query: {
                blogId: '63cab7ff8f08b59f051ff475'
            }
        };
        res = {
            send: sinon.spy(),
            status: sinon.stub().returns({ json: sinon.spy() })
        };
    });

    it('should create a new comment and return it', async () => {
        await createComments(req, res);
        expect(res.send.calledOnce).to.be.true;
        expect(res.status.notCalled).to.be.true;
        const savedComment = res.send.firstCall.args[0];
        expect(savedComment).to.be.an.instanceOf(mongoose.Document);
        expect(savedComment.name).to.equal(req.body.name);
        expect(savedComment.articleId).to.equal(req.query.blogId);
        expect(savedComment.comment).to.equal(req.body.comment);
    });

    it('should return a 500 status code and error message on error', async () => {
        const error = new Error('Error while saving comment');
        sinon.stub(Comment.prototype, 'save').throws(error);
        await createComments(req, res);
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.firstCall.args[0]).to.equal(500);
        expect(res.status().json.calledOnce).to.be.true;
        expect(res.status().json.firstCall.args[0]).to.deep.equal({ message: error });
    });
});


describe('getComment', () => {
  beforeEach(async () => {
    // Create test data
    await Comment.create({ articleId: '63cab7ff8f08b59f051ff475', text: 'Test comment 1' });
    await Comment.create({ articleId: '63d3bad2269a3def3001e576', text: 'Test comment 2' });
  });

  afterEach(async () => {
    // Delete test data
    await Comment.deleteMany();
  });

  it('should return comments for a given article ID', async () => {
    const req = { params: { articleId: '63cab7ff8f08b59f051ff475' } };
    const res = {
      send: (data) => {
        assert.deepEqual(data, [{ articleId: '163cab7ff8f08b59f051ff475', text: 'Test comment 1' }]);
      },
    };
    await getComment(req, res);
  });

  it('should return "no comments yet!!" if no comments are found', async () => {
    const req = { params: { articleId: '63ca9ecfb29252fcbae78962' } };
    const res = {
      send: (data) => {
        assert.deepEqual(data, { message: 'no comments yet!!' });
      },
    };
    await getComment(req, res);
  });

  it('should return "error happenedddd! sorry" if an error occurs', async () => {
    // Force an error by passing in an invalid ObjectId
    const req = { params: { articleId: 'invalidId' } };
    const res = {
      send: (data) => {
        assert.deepEqual(data, { message: 'error happenedddd! sorry' });
      },
    };
    await getComment(req, res);
  });
});
