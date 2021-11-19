const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// declare the route
const connectionRoute = require('./routes/connectionRoute');
const mainRoute = require('./routes/mainRoute');

// create app and configure
const app = express();
let port = 3000;
let host = 'localhost';

// set view engine to ejs
app.set('view engine', 'ejs');

// connect to database
mongoose.connect('mongodb://localhost:27017/demos', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    // listen to the server
    app.listen(port, host, () => {
        console.log('The server is running on port: ', port);
    });
})
.catch(err=> console.log(err.message));

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// set up routes
app.use('/', mainRoute);
app.use('/connections', connectionRoute);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    } 
    res.status(err.status);
    res.render('error', {error: err});
});

