const express = require('express');
const controller = require('../controllers/connectionController');
const router = express.Router();

router.get('/' , controller.connections);
router.get('/newConnection', controller.newConnection);

router.post('/', controller.create);

router.get('/:id', controller.connection_show);

router.get('/:id/edit', controller.edit);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports  = router;