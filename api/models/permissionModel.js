const mongoose = require('mongoose');
const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Permission = mongoose.model('permission', permissionSchema);
module.exports = Permission;