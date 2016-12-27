// NOTE: making product connection
var express = require ('express');
var router = express.Router();

var Product = require ('../model/product.js')

router.get ('/', function(request,response){
    Product.find ({}, function (error,result) {
        if (error) {
            console.log('*****error loadiing the products');
        }
        else {
            console.log('results for products: ', result);
            response.render('product/list', {
                data: {
                    productList: result
                }
            })
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
            response.redirect ('./create');
        }
    })
})

router.get('/:id', function(request, response){
    var productId = request.params.id
    // NOTE: will need to find by id
    Product.findById (productId, function (error, result) {
        if (error){
            console.log('***error finding the product', + productId);
            response.send('something went wrong with the single product')
        }
        else {
            console.log('results for the product to view: ', result)
            response.render ('product/view', {
                data: {
                    product:result
                }
            })
        }
    })
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
                response.redirect('/product/' + productId)
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

// -----------------------------------------------------------
module.exports = router
