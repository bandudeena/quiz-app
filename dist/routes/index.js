"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _quizRoutes = _interopRequireDefault(require("./quizRoutes.js"));
var _userRoutes = _interopRequireDefault(require("./userRoutes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.use(_quizRoutes["default"]);
router.use(_userRoutes["default"]);
var _default = router;
exports["default"] = _default;