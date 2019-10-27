const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controller/orders');

router.get('/', OrderController.orders_get_all);

router.post('/', OrderController.orders_create_order);

router.get('/:orderId', OrderController.orders_get_order);

router.delete('/:orderId', OrderController.orders_delete_order);

module.exports = router;