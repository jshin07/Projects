var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BicycleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },

    description: {
        type: String,
        maxlength: [ 200, "Cannot exceed 200 characters"],
        trim: true
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true
    },

    image: {
        type: String,
        required: [true, "image is required"],
        trim: true
    },

    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true
    }, 

    user_id: String,

},
    {timestamps: true}
);


mongoose.model('Bicycle', BicycleSchema);
