// NOTE: 3 COMMENTS create a schema for the comments. got to products js

var mongoose = require ('mongoose')

var Schema = mongoose.Schema;

var commentSchema = new Schema ({
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User'}
});

var Comment = mongoose.model ('Comment', commentSchema);
module.exports = Comment;
