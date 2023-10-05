const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title is required"] },
  description: { type: String, required: [true, "description is required"] },
  price: { type: Number, required: [true, "price is required"] },
  date: { type: Date, required: [true, "price is required"] },
  creator: { type: mongoose.Types.ObjectId, ref: 'User' },
});


module.exports = mongoose.model('Event', EventSchema) 