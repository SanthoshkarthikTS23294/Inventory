const express = require('express');
const controllerRoutes = require('./controller')

const router = express.Router();

router.get('/getinventory', controllerRoutes.getInventory);

router.post('/saveInventory', controllerRoutes.postInventory);

router.patch('/editInventory', controllerRoutes.patchInventory);

router.delete('/deleteInventory', controllerRoutes.deleteInventory);

module.exports = router;