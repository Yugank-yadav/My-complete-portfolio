const mongooes = require("mongoose");

const MyProjectSchema = new mongooes.Schema({
    id: { type: Number},
    title: { type: String},
    decs: { type: String},
    link: { type: String},
    image: { type: String}
});

const MyProjectModel = mongooes.model("MyProject", MyProjectSchema, "Projects");

module.exports = MyProjectModel;