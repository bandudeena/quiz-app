"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _knex = _interopRequireDefault(require("knex"));
var _objection = require("objection");
var _knexfile = _interopRequireDefault(require("./db/knexfile.js"));
var _index = _interopRequireDefault(require("./routes/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var host = process.env.HOST || "127.0.0.1";
var port = process.env.PORT || 3000;

// Initialize knex
var knex = (0, _knex["default"])(_knexfile["default"].development);
app.set("port", port);

// Load express bodyParser
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

// Bind all Models to a knex instance
_objection.Model.knex(knex);

// Import API Routes
app.use("/api", _index["default"]);
process.env.JWT_SECRET = "dGhpcyBpcyBhIGp3dCBrZXk=";

// Listen the server
app.listen(port, host);
console.log("🚀  Server listening on " + host + ":" + port);