// app.js
const express = require('express');
const mqtt = require('mqtt');
const printMessage = require('./thermalPrinter'); 
let buildOrderForPrinter = require('./buildOrderForPrinter');

const createMqttServer = () => {
const app = express();
const clientId = `localNode_Pantelis`
const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;
const clientConnectString = process.env.MQTT_CLIENT_CONNECT_STRING

// MQTT broker connection options
const client = mqtt.connect(clientConnectString, {
  clientId,
  username,
  password
})

// MQTT topic
const topic = process.env.MQTT_TOPIC;

// MQTT subscription
client.on('connect', () => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Error subscribing to topic:', err);
      } /* else {
        console.log('Subscribed to topic:', topic);
      } */
    });
  });
// MQTT subscription
client.on('message', async (_topic, message) => {
  const receivedMessage = message.toString();
  let buildOrder = await buildOrderForPrinter(receivedMessage);
  
/*   console.log('Received message:', buildOrder); */
  // Print the received message
  await printMessage(buildOrder);
});
/* client.on('message', (_topic, message) => {
  console.log('Reψλεαρceived message:', message.toString());
}); */

return app;
};

module.exports = createMqttServer;