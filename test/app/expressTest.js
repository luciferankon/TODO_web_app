const chai = require("chai");
const { Express, isMatching } = require("../../src/app/express");

const express = new Express();

/**
 * mock functions
 */

 const useHandler = function(req, res, next){
   //do something
   next();
 }

 const getHandler = function(req, res){
   //do domething
 }

 const postHandler = function(req, res){
   //do something
 }

 /**
  * mock functions end
  */


describe("isMatching", () => {
  it("should return true if url and method are same for request and route", () => {
    const request = { url: "/", method: "POST" };
    const route = { url: "/", method: "POST" };
    const expextedOutput = true;
    const actualOutput = isMatching(request, route);
    chai.assert.equal(actualOutput, expextedOutput);
  });

  it("should return false if url is same but method is different for request and route", () => {
    const request = { url: "/", method: "POST" };
    const route = { url: "/", method: "GET" };
    const expextedOutput = false;
    const actualOutput = isMatching(request, route);
    chai.assert.equal(actualOutput, expextedOutput);
  });

  it("should return false if url is different but method is same for request and route", () => {
    const request = { url: "/login", method: "POST" };
    const route = { url: "/", method: "POST" };
    const expextedOutput = false;
    const actualOutput = isMatching(request, route);
    chai.assert.equal(actualOutput, expextedOutput);
  });

  it("should return false if url and method are different for request and route", () => {
    const request = { url: "/login", method: "POST" };
    const route = { url: "/", method: "GET" };
    const expextedOutput = false;
    const actualOutput = isMatching(request, route);
    chai.assert.equal(actualOutput, expextedOutput);
  });
});

describe("use", () => {
  it("should not modify the route if use is not called", () => {
    const actualOutput = express.routes;
    const expextedOutput = [];
    chai.expect(actualOutput).to.be.deep.equal(expextedOutput);
  });

  it("should give the new routes if something is used", () => {
    express.use(useHandler);
    const actualOutput = express.routes;
    const expextedOutput = [{ handler: useHandler }];
    chai.expect(actualOutput).to.be.deep.equal(expextedOutput);
  });
});

describe(" post", () => {
  it("should give the previous routes if get is not called", () => {
    const actualOutput = express.routes;
    const expextedOutput = [{ handler: useHandler }];
    chai.expect(actualOutput).to.be.deep.equal(expextedOutput);
  });

  it("should give the new routes if get is called with something", () => {
    express.get("/", getHandler);
    const actualOutput = express.routes;
    const expextedOutput = [
      { handler: useHandler },
      { method: "GET", url: "/", handler: getHandler }
    ];
    chai.expect(actualOutput).to.be.deep.equal(expextedOutput);
  });
});

describe("post", () => {
  it("should give the previous routes if post is not called", () => {
    const actualOutput = express.routes;
    const expextedOutput = [
      { handler: useHandler },
      { method: "GET", url: "/", handler: getHandler }
    ];
    chai.expect(actualOutput).to.be.deep.equal(expextedOutput);
  });

  it("should give the new routes if post is called with something", () => {
    express.post("/", postHandler);
    const actualOutput = express.routes;
    const expextedOutput = [
      { handler: useHandler },
      { method: "GET", url: "/", handler: getHandler },
      { method: "POST", url: "/", handler: postHandler}
    ];
    chai.expect(actualOutput).to.be.deep.equal(expextedOutput);
  });
});