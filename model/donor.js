const mongoose = require('../config/mongoose')
const validator = require('validator')

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email must be in proper format")
            }
        },
        trim: true,
        lowercase: true

    },
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true
    }

})

const Donor = mongoose.model('Donor', donorSchema)
module.exports = Donor