const e = require('express');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;