const mqtt = require("mqtt");
const printMessage = require("./thermalPrinter");
const buildOrderForPrinter = require("./buildOrderForPrinter");
const {
  getLocalNodePublicIP,
  postLocalNodePublicIP,
} = require("./publicIPResolver");

const createMqttClient = () => {
  const clientId = process.env.MQTT_CLIENT;
  const username = process.env.MQTT_USERNAME;
  const password = process.env.MQTT_PASSWORD;
  const clientConnectString = process.env.MQTT_CLIENT_CONNECT_STRING;

  // MQTT broker connection
  const client = mqtt.connect(clientConnectString, {
    clientId,
    username,
    password,
  });

  // MQTT topic
  const topic = process.env.MQTT_TOPIC;
  const updatePublicIP = process.env.MQTT_UPDATE_PUBLIC_IP;

  // MQTT subscription
  client.on("connect", async () => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Error subscribing to topic:", err);
      } else {
        console.log("Subscribed to topic:", topic);
      }
    });

    client.subscribe(updatePublicIP, (err) => {
      if (err) {
        console.error("Error subscribing to topic:", err);
      } else {
        console.log("Subscribed to topic:", updatePublicIP);
      }
    });

    const ip = await getLocalNodePublicIP();
    const temp = await postLocalNodePublicIP(ip);
    console.log(
      `LocalNode PublicIP to report: ${ip} \n API Server PublicIP reports: ${temp}`
    );
  });

  // MQTT await message
  client.on("message", async (_topic, message) => {
    const receivedMessage = message.toString();
    switch (_topic) {
      case "testTopic": {
        console.log(`Received message ${receivedMessage} on topic: testTopic`);

        try {
          const buildOrder = await buildOrderForPrinter(receivedMessage);
          console.log("Received message:", buildOrder);

          // Print the received message
          try {
            await printMessage(buildOrder);
          } catch (printError) {
            console.error("Error printing message:", printError);
          }
        } catch (buildError) {
          console.error("Error building order for printer:", buildError);
        }

        break;
      }

      case "updatePublicIP": {
        const ip = await getLocalNodePublicIP();
        const temp = await postLocalNodePublicIP(ip);
        console.log(
          `LocalNode PublicIP to report: ${ip} \n API Server PublicIP reports: ${temp}`
        );
      }
    }
  });
  client.on("error", (err) => {
    console.error("MQTT client error:", err);
  });
  client.on("reconnect", () => {
    console.log("Reconnecting to MQTT broker...");
  });
  client.on("close", () => {
    console.log("MQTT connection closed.");
  });
  /* const mqttClientInstance = {
    client,
    publishMessage: (topic, message) => {
      // Publish the message to the specified topic
      client.publish(topic, message, (err) => {
        if (err) {
          console.error("Error publishing message:", err);
        } else {
          console.log(`Message published to topic "${topic}": ${message}`);
        }
      });
    },
    function2: (topic, message) => {
      // Publish the message to the specified topic
      client.publish(topic, "function2", (err) => {
        if (err) {
          console.error("Error publishing message:", err);
        } else {
          console.log(`Message published to topic "${topic}": "function2"`);
        }
      });
    },
  }; 

  return mqttClientInstance;*/
};

module.exports = createMqttClient;
