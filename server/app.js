var express = require('express');
var bodyParser = require('body-parser');

// include routes
var users = require('./routes/users');

var app = express();

// enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use routes
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.json(
        {
            'success' : false,
            'msg'     : err.status + ': ' + err.message + '.'
        }
    );
});

module.exports = app;
