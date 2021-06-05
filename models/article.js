const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ArticleSchema = new Schema(
    {
        title: {type: String, minlength: 5, maxlength: 400, required: true},
        subtitle: {type: String, minlength: 5, default:''},
        description: {type: String, minlength: 5, maxlength: 400, required: true },
        owner: {type: ObjectId, ref: 'User', required: true},
        category: { type: String, enum: ['sport', 'game', 'history'], required: true },
    },
    {
        timestamps: true
    }
);

ArticleSchema.index(
    {
      title: "text",
    }
);

module.exports = mongoose.model('Article', ArticleSchema);
