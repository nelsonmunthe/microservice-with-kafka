const OrderModel = require('../../share/models/OrderModel')
const Validator = require('validatorjs');
const GenericResponseEntity = require('../../share/entities/GenericResponseEntity');
const KafkaPubSub = require('../../share/entities/KafkaPubSub')

class OrderUseCase{
    
    constructor(orderModel){
        this.orderModel = orderModel || new OrderModel
    };

    async createOrder(payload){
        const response = new GenericResponseEntity();

        try {
            const rules = {
                productId: 'required|integer',
                price: 'required|integer',
                quantity: 'required|integer',
            };

            const validator = new Validator(payload, rules);

            if (!validator.check()) {
                response.message = 'Params invalid.';
                response.data = validator.errors.all();
                return response;
            };
            
            payload['tax'] = 3;
            payload['totalPrice'] = (payload.quantity * payload.price) - (payload.quantity * payload.price *  payload['tax']/100);
            payload['status'] = 'Pending';
           
            const order = await OrderModel.create(payload);

            if(order) {
                await new KafkaPubSub().pub(process.env.KAFKA_TOPIC_PURCHASE, order)
            };

            return response.successResponse('Order Created', 201, order);

        } catch (error) {
            return response.errorResponse('Failed created Order', 400, null)
        }
    }
}

module.exports = OrderUseCase;