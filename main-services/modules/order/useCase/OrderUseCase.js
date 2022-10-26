const OrderModel = require('../../share/models/OrderModel')
const Validator = require('validatorjs');
const GenericResponseEntity = require('../../share/entities/GenericResponseEntity');
const KafkaNode = require('../../share/entities/KafkaNode');

class OrderUseCase{
    
    constructor(orderModel, kafkaNode){
        this.orderModel = orderModel || new OrderModel
        this.kafkaNode = kafkaNode || new KafkaNode()
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
                const topic = [
                    {
                        topic: process.env.KAFKA_TOPIC_ORDER, 
                        messages: JSON.stringify(order),
                        partition: 0
                    }, 
                    {
                        topic: process.env.KAFKA_TOPIC_ORDER, 
                        messages: JSON.stringify(order),
                        partition: 1
                    },
                ];

                await this.kafkaNode.publish(topic, order);
                
                return response.successResponse('Order Created', 201, order);
            }
            else return response.errorResponse('Failed created Order', 400, null)

        } catch (error) {
            return response.errorResponse('Failed created Order', 400, null)
        }
    }
}

module.exports = OrderUseCase;