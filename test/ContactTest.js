const assert = require('assert');
const request = require('supertest');
const Contact = require('../src/models/contactModel');

describe('POST Contact', () => {
    it('should create a new contact message', (done) => {
        const contactData = {
            Email: 'Donna@gmail.com',
            Subject: 'Test Subject',
            Message: 'Test message'
        }

        request(app)
            .post('api/Contact')
            .send(contactData)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Contact.findById(res.body._id, (error, contact) => {
                    if (error) {
                        return done(error);
                    }

                    assert.equal(contact.Email, contactData.Email);
                    assert.equal(contact.Subject, contactData.Subject);
                    assert.equal(contact.Message, contactData.Message);
                    done();
                });
            });
    });
});




describe('Get Contacts', () => {
    it('should get all contacts with a limit', (done) => {
        const limit = 5;

        request(app)
            .get(`api/Contacts?max=3`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                assert.equal(res.body.length, limit);
                done();
            });
    });
});

const assert = require('assert');
const request = require('supertest');
const app = require('../server');
const Contact = require('../models/Contact');

describe('Get Contact/:id', () => {
    it('should get a single contact by id', (done) => {
        const contact = new Contact({
            Email: 'bella@gmail.com',
            Subject: 'Capstone',
            Message: 'Hi Christa!!, Your Works looks Professional, I would like to get intouch with you via the Email'
        });

        contact.save((err, contact) => {
            if (err) {
                return done(err);
            }

            request(app)
                .get(`api/Contact/63ca982b68c1f2d2455eb70`)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    assert.equal(res.body[0]._id, contact._id.toString());
                    assert.equal(res.body[0].Email, contact.Email);
                    assert.equal(res.body[0].Subject, contact.Subject);
                    assert.equal(res.body[0].Message, contact.Message);
                    done();
                });
        });
    });
});
