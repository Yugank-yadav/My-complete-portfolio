const mongooes = require('mongoose');

const UserSchema = mongooes.Schema({
    // name : { type: String, required:[true,'Name is Required'] },
    name : { type: String},
    email : { type: String},
    number : { type: Number},
    emailSub : { type: String},
    desc : { type: String}
});

const UserModel = mongooes.model("User", UserSchema, "Messages");

module.exports = UserModel;