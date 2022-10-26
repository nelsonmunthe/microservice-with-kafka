const kafka = require('kafka-node');

class KafkaNode{
    constructor(){
        
    }

    async publish(topic, payload) {
       
        const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BROKER});
        const producer = new kafka.Producer(client);
        producer.on('ready', async () => {
            producer.send(
                topic, 
                async (err, data) => {
                    if(err) console.log(err)
                    else console.log('order created : ', payload, data)
                }
            )
        })
    }
};

module.exports =  KafkaNode;