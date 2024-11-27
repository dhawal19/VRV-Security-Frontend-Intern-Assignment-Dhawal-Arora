const Permission = require('../models/permissionModel');

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPermission = async (req, res) => {
    const permission = new Permission({
        name: req.body.name,
        description: req.body.description
    });
    const foundPermission = await Permission.findOne({ name: req.body.name });
    if (foundPermission) {
        return res.status(400).json({ message: 'Permission already exists' });
    }
    try {
        const newPermission = await permission.save();
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePermission = async (req, res) => {
    try {
        const permission = await Permission.findById(req.params.id);
        if (permission) {
            permission.name = req.body.name || permission.name;
            permission.description = req.body.description || permission.description;
            const updatedPermission = await permission.save();
            if (updatedPermission) {
                res.json(updatedPermission);
            }
            else {
                res.status(400).json({ message: 'Permission not updated' });
            }
        }
        else {
            res.status(404).json({ message: 'Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePermission = async (req, res) => {
    try {
        const permission = await Permission.findById(req.params.id);
        if (permission) {
            await Permission.findByIdAndDelete(req.params.id);
            res.json({ message: 'Permission removed' });
        }
        else {
            res.status(404).json({ message: 'Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllPermissions,
    createPermission,
    updatePermission,
    deletePermission
}