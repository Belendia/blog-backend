const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const authMiddleware = require("../middleware/is-auth");

describe("Auth Middleware", function () {
  it("should throw and error if no authorization header is present", function () {
    const req = {
      get: function () {
        return null;
      },
    };
    // we use bind because we want expect() function to call authMiddleware function and handle errors by its own.
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated"
    );
  });

  it("should throw an error if the authorization header is not one string", function () {
    const req = {
      get: function (headerName) {
        return "xyz";
      },
    };

    expect(authMiddleware.bind(this.req, {}, () => {})).to.throw();
  });

  it("should throw an error if the token cannot be verified", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyz";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after decoding the token", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyz";
      },
    };

    // replace the original jwt.verify function with a stub
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });

    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    // restore the original jwt.verify function not to disturb other codes
    jwt.verify.restore();
  });
});
