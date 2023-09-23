const createMqttClient = require("./utils/mqttClientConstructor.js");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = express();

// Create the MQTT client instance
const mqttClient = createMqttClient();

// Publish a message using the publishMessage method
/* mqttClient.function2("testTopic", "testMessage"); */

// Start the Express server on a different port
const localPort = 3000;
app.listen(localPort, () => {
  console.log(`Express server is listening on port ${localPort}...`);
});
