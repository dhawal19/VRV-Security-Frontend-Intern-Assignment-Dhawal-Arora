const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');

const getAllRoles = async (req, res) => {
    try{
        let roles = await Role.find();
        roles = await Promise.all(roles.map(async role => {
            const permissions = await Promise.all(role.permissions.map(async permission => {
                const id = permission.toString();
                const { name } = await Permission.findById(id);
                return name;
            }));
            return {
                ...role.toObject(),
                permissions
            };
        }));
        res.json(roles);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const createRole = async(req, res) => {
    if(!req.body.name || !req.body.permissions){
        return res.status(400).json({ message: 'Role name and permissions are required' });
    }
    const foundRole = await Role.findOne({ name: req.body.name });
    if(foundRole){
        return res.status(400).json({ message: 'Role already exists' });
    }
    let permissions = [];
    if(req.body.permissions.length>0){
        permissions = await Promise.all(req.body.permissions.map(async permission => {
            const foundPermission = await Permission.findOne({ name: permission });
            return foundPermission._id;
        }));
    }
    const role = new Role({
        name: req.body.name,
        permissions: permissions
    });
    try{
        const newRole = await role.save();
        res.status(201).json(newRole);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const updateRole = async(req, res) => {
    try{
        const role = await Role.findById(req.params.id);
        if(role){
            role.name = req.body.name || role.name;
            let permissions = [];
            if(req.body.permissions.length>0){
                permissions = await Promise.all(req.body.permissions.map(async permission => {
                    const foundPermission = await Permission.findOne({ name: permission });
                    return foundPermission._id;
                }));
            }
            role.permissions = permissions || role.permissions;
            const updatedRole = await role.save();
            if(updatedRole){
                res.json(updatedRole);
            }
            else{
                res.status(400).json({ message: 'Role not updated' });
            }
        }
        else{
            res.status(404).json({ message: 'Role not found' });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const deleteRole = async(req, res) => {
    try{
        const role = await Role.findById(req.params.id);
        if(role){
            await Role,Role.findByIdAndDelete(req.params.id);
            res.json({ message: 'Role removed' });
        }
        else{
            res.status(404).json({ message: 'Role not found' });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllRoles, createRole, updateRole, deleteRole };