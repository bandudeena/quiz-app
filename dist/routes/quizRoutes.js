"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _quizService = _interopRequireDefault(require("../service/quizService.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var checkQuizRequestBody = function checkQuizRequestBody() {
  return function (req, res, next) {
    var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description,
      createdBy = _req$body.createdBy,
      questions = _req$body.questions;
    if (!title || !description || !Array.isArray(questions) || questions.length === 0) {
      var response = {
        success: false,
        errors: [400],
        data: null
      };
      return res.status(400).json(response);
    }
    var _iterator = _createForOfIteratorHelper(questions),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var question = _step.value;
        if (!question.description || !question.mandatory || !Array.isArray(question.choices) || question.choices.length === 0) {
          var _response = {
            success: false,
            errors: [400],
            data: null
          };
          return res.status(400).json(_response);
        }
        var _iterator2 = _createForOfIteratorHelper(question.choices),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var choice = _step2.value;
            if (!choice.description || choice.rightAnswer === undefined) {
              var _response2 = {
                success: false,
                errors: [400],
                data: null
              };
              return res.status(400).json(_response2);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    next();
  };
};
var verifyToken = function verifyToken() {
  return function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
      var token = authHeader.split(" ")[1];
      _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
          var response = {
            success: false,
            errors: [403],
            data: null
          };
          return res.status(403).json(response);
        }
        req.user = user;
        next();
      });
    } else {
      var response = {
        success: false,
        errors: [401],
        data: null
      };
      return res.status(401).json(response);
    }
  };
};
var router = (0, _express.Router)();
router.get("/quizzes", verifyToken(), _quizService["default"].getAll);
router.post("/quizzes", verifyToken(), checkQuizRequestBody(), _quizService["default"].create);
var _default = router;
exports["default"] = _default;