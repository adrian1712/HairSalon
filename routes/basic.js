// NOTE: 8 before this make sure to see step 7 in server.js
// NOTE:8 bring in express and go to step 8a before you continue
var express = require ('express');
var router = express.Router();

// NOTE:9 this is where we connect basic pages
router.get('/', function(request, response) {
    response.render ('home');
});
router.get('/products', function(request, response) {
    response.render ('products')
});
router.get('/services', function(request, response) {
    console.log('this is the session data', request.session);
    response.render ('services')
});

// NOTE: This will connect the angular page
router.get('/admin', function (request,response){
    response.render('home',
    // NOTE: We need this to let the browser know to use the
    // NOTE: index-angular layout instead of the normal index.
    {
        layout: 'index-angular'
    })
})

// NOTE:8a and export the modules before connecting
module.exports = router

// NOTE: 10 create log in pages and user.js
