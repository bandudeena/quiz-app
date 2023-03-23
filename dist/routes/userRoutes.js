"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userService = _interopRequireDefault(require("../service/userService.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.post("/user/signin", _userService["default"].signIn);
router.post("/user/signup", _userService["default"].signUp);
var _default = router;
exports["default"] = _default;