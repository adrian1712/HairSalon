// NOTE: Used step 16 in calendar as referance for notes

var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema ({
    product: String,
    price: String,
    description: String,
    // NOTE: 2 COMMENTS, This is where we will Add the comments section for the one to many. go to comments schemma
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

var Product = mongoose.model ('Product', productSchema);
module.exports = Product
