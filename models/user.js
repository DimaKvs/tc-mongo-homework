const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {type: String, minlength: 4, maxlength: 50, required: true},
        lastName: {type: String, minlength: 3, maxlength: 60, required: true},
        role: { type: String, enum: ['admin', 'writer', 'guest'], required: true },
        numberOfArticles: {type: Number, default: 0},
        nickName: { type: String }
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('User', UserSchema);