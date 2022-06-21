const expect = require("chai").expect;
const authMiddleware = require("../middleware/is-auth");

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
