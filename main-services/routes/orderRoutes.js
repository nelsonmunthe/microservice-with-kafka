const express = require('express');
const OrderController = require('../modules/order/OrderController')

const router = express.Router();

router.post('/create', async(req, res, next) => {
    try {
        await new OrderController().createOrder(req, res, next)
    } catch (error) {
        next(error)
    }
})

module.exports = router;