const { httpResponse } = require("../share/helpers/response");
const OrderUseCase = require('./useCase/OrderUseCase');

class OrderController {
    constructor(orderUseCase) {
        this.orderUseCase = orderUseCase || new OrderUseCase()
    }

    async createOrder(req, res, next) {
        httpResponse(await this.orderUseCase.createOrder(req.body), res)
    }

};

module.exports = OrderController