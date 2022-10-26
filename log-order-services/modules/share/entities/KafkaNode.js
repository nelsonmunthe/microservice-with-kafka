const kafka = require('kafka-node');
const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BROKER});

const OrderStateModel = require('../models/OrderStateModel')

class KafkaNode{
    constructor(){
        
    };

    async publish() {
        const producer = new kafka.Producer(client);
        producer.on('ready', () => {
            producer.send(
                [
                    {
                        topic: process.env.KAFKA_TOPIC_ORDER,
                        message: JSON.stringify('Hello bro')
                    }
                ], (err, data) => {
                    if(err) console.log(err)
                    else console.log('data : ', data)
                }
            )
        })
    }

    async subscribe() {
        const consumer = new kafka.Consumer(
            client, 
            [
                {
                    topic: process.env.KAFKA_TOPIC_ORDER,
                    partition: 0
                }
            ], 
            {
                fromOffset: false
            }
        );
        
        let offset = new kafka.Offset(client);

        offset.fetch(
            [
                { 
                    topic: process.env.KAFKA_TOPIC_ORDER, 
                    partition: 0, time: -1 
                }
            ], 
            function (err, data) {
            let latestOffset = data[process.env.KAFKA_TOPIC_ORDER]['0'][0];
            console.log("Consumer current offset: " + latestOffset);
        });
        
        consumer.on('message', async (payload) => {
            const{ value }  = payload;  
           
            if(value) {
                const message = await this.messageProcessor(payload)
                const orderState = await OrderStateModel.create({
                    orderId : message.id,
                    status: message.status
                })
        
            } else {
                console.log('there is no payload', payload, new Date())
            }
        })
        
        consumer.on('error', async (error) => {
            console.log(error)
        });
    }

    async messageProcessor (payload) {
        return await JSON.parse(payload?.value.toString())
    }
};

module.exports = KafkaNode;