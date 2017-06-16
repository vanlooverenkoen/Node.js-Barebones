process.env.NODE_ENV = 'test';

"use strict";
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let express = require('../index');

describe('statusRoute', () => {
    it('should have statusCode 200', () => {
        return chai.request(express).get('/api/status')
            .then(res => {
                expect(res).to.have.status(200);
            });
    });
});
