const dotenv = require('dotenv');
const createMqttServer = require('./mqtt');
/* const printMessage = require('./thermalPrinter'); // Import the modified thermalPrinter.js script */

dotenv.config({ path: './config.env' });

// Create the MQTT server instance
const mqttServer = createMqttServer();

// Start the MQTT server on a different port
const localPort = 3000;
mqttServer.listen(localPort, () => {
  console.log(`MQTT server is listening on port ${localPort}...`);
});
/* // MQTT subscription
mqttServer.on('message', async (_topic, message) => {
  const receivedMessage = message.toString();
  console.log('Received message:', receivedMessage);
  // Print the received message
  await printMessage(receivedMessage);
}); */

