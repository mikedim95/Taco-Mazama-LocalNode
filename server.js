const dotenv = require('dotenv');
const createMqttServer = require('./mqtt');

dotenv.config({ path: './config.env' });

// Create the MQTT server instance
const mqttServer = createMqttServer();

// Start the MQTT server on a different port
const localPort = 3000;
mqttServer.listen(localPort, () => {
  console.log(`MQTT server is listening on port ${localPort}...`);
});