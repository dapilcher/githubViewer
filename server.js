// modules ===========================================
var express = require('express');
var app = express();

// configuration =====================================
// set port
var port = 8080;

// set static files
app.use(express.static(__dirname + '/public'));

// routes ============================================
// application ---------------------------------------
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

// start app =========================================
app.listen(port);

console.log('For a good time call: localhost:' + port);

exports = module.exports = app;