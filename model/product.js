// NOTE: Used step 16 in calendar as referance for notes

var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema ({
    product: String,
    price: String,
    description: String
})

var Product = mongoose.model ('Product', productSchema);
module.exports = Product
