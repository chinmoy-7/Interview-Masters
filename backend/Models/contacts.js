const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
    email:{type:String},
    name:{type:String},
    spoc:{type:String},
    created:{type:Date},

})

const contact = mongoose.model("contact",ContactSchema);

module.exports = contact;