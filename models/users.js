const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: { type: String, require: true },
    email: { type: String, require: true },
    firstname: { type: String },
    lastname: { type: String },
    image: { type: String }
})

mongoose.model('users', UserSchema)