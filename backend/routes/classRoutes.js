const express = require('express');
const { getClass } = require('../controllers/classController');
const router = express.Router();

router.get('/class', getClass);

module.exports = router;
