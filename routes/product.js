// NOTE: making product connection
var express = require ('express');
var router = express.Router();

var Product = require ('../model/product.js')
var Comment = require ('../model/comment.js');

router.get ('/', function(request,response){
    Product.find ({}, function (error,result) {
        if (error) {
            console.log('*****error loadiing the products');
        }
        else {
            if (request.sendJson == true) {
                response.json (result)
            }
            else {
                console.log('results for products: ', result);
                response.render('product/list', {
                    data: {
                        productList: result
                    }
                })
            }
        }
    })
})

// router.get ('/', function(request,response){
//     response.render('product/list')
// })

router.get ('/create', function (request, response) {
    response.render('product/edit', {
        // NOTE: This data is injected into the view page tittle
        data: {
            title: 'Create Product',
            button: 'Create Product',
            method: 'POST'
        }
    })
})

router.post('/', function(request, response) {
    // NOTE:14 the appointment is made using body information
    // appointment is defined in the model
    var newProduct = Product (request.body);

    newProduct.save (function(error){
        if (error) {
            var errorMessage = 'canot create Product';
            console.log('error: ') + errorMessage;
            request.send(errorMessage)
        }
        else {
            if (request.sendJson == true) {
                response.json ({
                    message: 'Connected to the product post path.'
                })
            }
            else {var Comment = require ('../model/comment.js');
                response.redirect ('./create');
            }
        }
    })
})

router.get('/:id', function(request, response){
    var productId = request.params.id
    // NOTE: will need to find by id

    Product
        .findById (productId)
        .populate ({
            path: 'comments',
            populate: ({
                path: 'author'
            })
        })
        .exec (function (error, result) {
            response.render ('product/view', {
                data: {
                    product:result
                }
            })
            console.log('this is the results for the comments', result);
        })

    // Product.findById (productId, function (error, result) {
    //     if (error){
    //         console.log('***error finding the product', + productId);
    //         response.send('something went wrong with the single product')
    //     }
    //     else {
    //         if (request.sendJson == true) {
    //             response.json (result)
    //         }
    //         else {
    //             console.log('results for the product to view: ', result)<div class="panel panel-default">
    //             response.render ('product/view', {
    //                 data: {
    //                     product:result
    //                 }
    //             })
    //         }
    //     }
    // })
})

router.get('/:id/edit', function(request, response){
    var productId = request.params.id
    // NOTE: will need to find by id
    Product.findById (productId, function (error, result) {
        if (error){
            console.log('error finding the product to edit', + productId);
            response.send('something went wrong editing product')
        }
        else {
            response.render ('product/edit', {
                data: {
                    title: 'Edit Product',
                    method: 'PUT',
                    button: 'Edit Product',
                    product: result
                }
            })
        }
    })
})

router.put ('/:id', function (request, response) {
    var productId = request.params.id
        Product.findByIdAndUpdate(productId,request.body,function(error,result) {
            if (error){
                console.log('can not update product');
            }
            else{
                if (request.sendJson == true) {
                    response.json ({
                        message: 'Updated product.'
                    })
                }
                else {
                    response.redirect('/product/' + productId)
                }
            }
        }
    )
})

router.get ('/:id/delete', function (request,response) {
    var productId = request.params.id
    Product.findByIdAndRemove(productId, function(error,result){
        if(error){
            console.log('Product could not be deleted');
        }
        else {
            response.redirect ('/product')
        }
    })
})


// NOTE: this is where we create the comment
router.post ('/:id/comment', function (request, response) {
    var productId = request.params.id

    Product.findById (productId, function (error, product) {
        if (error) {
                console.log('unable to save the comment to ' + productId);
                response.send ('unable to save the comment to ' + productId)
        }
        else {
            var comment = Comment (request.body);
            var user = request.session.user;
            comment.author = user;

            comment.save (function (error, result) {
                if (error) {
                    console.log('not able to save to the ' + productId);
                    response.send ('not able to save to the ' + productId);
                }
                else {
                    product.comments.push (comment);
                    product.save (function (error,prodResult) {
                        response.redirect ('/product/' + productId)
                    })
                }
            });
        }
    })
})

// -----------------------------------------------------------
module.exports = router
