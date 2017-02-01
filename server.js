// NOTE:1 Start by bringing in express and define express
var express = require ('express');


// NOTE:2 define server as express
var server = express ();
server.use (express.static ('public'));

// NOTE:13 adding body parcer to read information
var bodyParser = require ('body-parser');
server.use (bodyParser.urlencoded ({ extended: true }));

// NOTE: bring in method-overide to be able to use the PUT method in http
var methodOveride = require ('method-override');
server.use (methodOveride (function (request, response) {
    if (typeof request.body === 'object') {
        if (request.body._method) {
            var method = request.body._method;
            delete request.body._method;
            return method;
        }
    }
}))
// NOTE: 12g bring express session
var session = require ('express-session');

 server.use (session ({
     secret: "this is secret phrase",
     resave: false,
     saveUninitialized: true
 }));
// NOTE:12h bring in flash
var flash = require ('connect-flash')
server.use (flash ());

// set global session befor any other session is run.
server.use(function (request, response, next) {
    var user = request.session.user;
    if (user) {
        response.locals.user = user;

        // Check if we have an admin user.
        if (user && user.type == 'admin') {
            user.admin = true;
        }
    }
    //  set and used the falash object before running any other routs before any other function
    response.locals.message = request.flash ();

    // grav the content type from the request
    var contentType = request.headers ['content-type'];
    console.log('contents type is: ', contentType);

    //  set our request object to use JSON if we detect a request for application/json
    if (contentType == 'application/json') {
        request.sendJson = true;
    }

    // lets move on to the next route
    next ();
})

// NOTE:3a dont forget the port.
var port = 3001;


// NOTE:5 bring in express handlebars
var handlebars = require ('express-handlebars');
server.engine ('.hbs', handlebars ({
    // NOTE: this sets the defult lays out and directory.
    layoutsDir: 'templates',
    defaultLayout: 'index',
    extname: '.hbs'
}));

server.set('views', __dirname + '/templates/partials');

server.set('view engine', '.hbs');



// NOTE:5 End


// NOTE:3b set upserver to run
server.listen ( port, function (error) {
    if (error !== undefined) {
        console.log('***unable to connect');
        console.error(error);
    }
    else {
        // db = database;
        console.log('the server is running on ', + port);
    }

});



// NOTE:14a bring in mongoose
// load mongoose
var mlabKey = require('./.env').mlabKey;
var mongoose = require ('mongoose');
// connect mongoose
// mongoose.connect ('mongodb://localhost:27017/salon_database')
// NOTE: this uses mlab insted of localhost
mongoose.connect(mlabKey);

// set the library to user

mongoose.Promise = require('bluebird');





// connect to basic.js_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

// NOTE:7 make routes folder and move all my url routes out separate area
// go too basic.js for next step.

var basicRoutes = require ('./routes/basic.js');
server.use ('/', basicRoutes);


// NOTE:4 set the url of routes that the server can use
// server.get('/', function(request, response) {
//     // verify your connection
//     // response.send('starting project hair salon')
//     // then connect to page. Go to n0ote5 before running.
//     response.render ('home');
// });
// server.get('/products', function(request, response) {
//     response.render ('products')
// });
// server.get('/services', function(request, response) {
//     response.render ('services')
// });
// server.get('/login', function(request,response) {
//     response.render ('login')
// });
// // NOTE:6 set area where the content needs to be injected. go to index.hbs

// connect to user.js_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

var userRoutes = require ('./routes/user/user.js');
server.use('/user', userRoutes);

var accessRoutes = require ('./routes/user/access.js');
server.use('/', accessRoutes);

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

var calendarRoutes = require ('./routes/calendar.js');
server.use('/calendar', calendarRoutes);

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

var productRoutes = require ('./routes/product.js');
server.use ('/product', productRoutes);

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
