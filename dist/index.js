'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(config.mongoUrl, function () {
  console.log("Database is now connected");
});

var app = (0, _express2.default)();

app.use('/app/comments', routerComments);
app.use('/app/trucks', routerTrucks);

app.listen(config.port, function () {
  console.log('the app is listening on the port ' + config.port);
});
//# sourceMappingURL=index.js.map