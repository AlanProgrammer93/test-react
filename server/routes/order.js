const express = require('express')

const { create, getOrders, remove } = require('../controllers/order')
const { authCheck } = require('../middleware/auth');

const router = express.Router();

router.post('/create', create);
router.get('/getOrders', authCheck, getOrders);
router.delete('/remove/:id', authCheck, remove);

module.exports = router;