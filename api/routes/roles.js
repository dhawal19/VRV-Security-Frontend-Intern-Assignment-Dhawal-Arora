const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');

router.get('/', roleController.getAllRoles);
router.post('/', roleController.createRole);
router.delete('/:id', roleController.deleteRole);
router.patch('/:id', roleController.updateRole);

module.exports = router;