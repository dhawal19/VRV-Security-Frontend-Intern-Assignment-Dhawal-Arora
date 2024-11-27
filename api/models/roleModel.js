const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // array of permissions reference
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permission'
    }]

});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;