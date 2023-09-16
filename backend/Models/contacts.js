const mongoose = require("mongoose");
const {con} = require("../DB/connect");
const AutoIncrementFactory = require('mongoose-sequence');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ContactSchema = mongoose.Schema({
    // Remove the 'id' field here
    email: { type: String },
    name: { type: String, index: true },
    spoc: { type: String },
    phone: { type: Number },
    created: { type: Date },
});

// ContactSchema.plugin(AutoIncrement); // Add this line to enable auto-increment for the 'id' field


const contact = mongoose.model("contact",ContactSchema);

module.exports = contact;
