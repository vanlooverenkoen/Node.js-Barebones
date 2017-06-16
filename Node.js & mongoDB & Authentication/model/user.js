const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const types = mongoose.SchemaTypes;

const userSchema = new Schema({
    firstName: types.String,
    lastName: types.String,
    email: types.String,
    password: types.String,
});

const user = mongoose.model('User', userSchema);

module.exports = user;