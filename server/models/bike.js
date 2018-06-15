const mongoose = require('mongoose');
const { Schema } = mongoose;

const bikeSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please enter a title for this bike."],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [200, "Not too wordy or folks won't buy it. Please limit description to 200 characters."],
        required: [true, "Please enter a description of the bike."],
    },
    price: {
        type: Number,
        trim: true,
        min: [1, "Sorry, you can't give the bike away for free. Price must be at least $1."],
        required: [true, "Please enter the sale price of the bike."],
    },
    location: {
        type: String,
        trim: true,
        required: [true, "Please enter the city, state of the where this bike is located."],
    },
    imgURL: {
        type: String,
        trim: true,
        required: [true, "We need an image in order to sell this bike."],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true,
},
);

module.exports = mongoose.model('Bike', bikeSchema);