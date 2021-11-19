const express = require('express');
const main_controller = require('../controllers/mainController');
const router = express.Router();

router.get('/' , main_controller.home);
router.get('/about' , main_controller.about);
router.get('/contact' , main_controller.contact);

module.exports  = router;