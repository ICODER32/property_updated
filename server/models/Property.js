const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    night_cost: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    room: {
        type: Boolean,
        required: true,
    },
    house: {
        type: Boolean,
        required: true,
    },
    max_guests: {
        type: Number,
        required: true,
    },
    bed_number: {
        type: Number,
        required: true,
    },
    bath_number: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date

    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
