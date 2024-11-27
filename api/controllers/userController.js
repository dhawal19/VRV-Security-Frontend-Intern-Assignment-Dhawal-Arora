const Role = require('../models/roleModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        users = await Promise.all(users.map(async user => {
            const roles = await Promise.all(user.roles.map(async role => {
                const id = role.toString();
                const { name } = await Role.findById(id);
                return name;
            }));
            return {
                ...user.toObject(),
                roles
            };
        }));
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async(req, res) => {
    const salt = await bcrypt.genSalt(12);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let roles = [];
    if(req.body.roles && req.body.roles.length > 0) {
        roles = req.body.roles;
        roles = await Promise.all(roles.map(async role => {
            const foundRole = await Role.findOne({ name: role });
            return foundRole._id;
        }));
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        // password: hashedPassword,
        status: req.body.status,
        roles: roles
    });
    try {
        const foundUser = await User.findOne({ email: req.body.email });
        if (foundUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async(req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (req.body.password) {
            const salt = await bcrypt.genSalt(12);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            if (req.body.roles && req.body.roles.length > 0) {
                let roles = req.body.roles;
                roles = await Promise.all(roles.map(async role => { 
                    const foundRole = await Role.findOne({ name: role });
                    return foundRole._id;
                }));
                user.roles = roles || user.roles;
            }
           
            user.status = req.body.status.toLowerCase() || user.status;
            const updatedUser = await user.save();
            if (updatedUser) {
                res.json(updatedUser);
            }
            else {
                res.status(400).json({ message: 'User not updated' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User removed', status: 200 });
        }
        else{
            res.status(404).json({ message: "User not removed, user doesn't exist" , status: 404});
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, status: 500 });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};