import { doesNotMatch } from "assert";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index.js";

chai.use(chaiHttp);

describe('Test for Articles public features', ()=>{

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