const expect = require("chai").expect;
const authMiddleware = require("../middleware/is-auth");

it("should throw and error if no authorization header is present", function () {
  const req = {
    get: function () {
      return null;
    },
  };
  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
    "Not authenticated"
  );
});
