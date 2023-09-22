const axios = require("axios");
const mqtt = require("mqtt");
const printMessage = require("./thermalPrinter");
const buildOrderForPrinter = require("./buildOrderForPrinter");

const sendPostRequest = async () => {
  try {
    const response = await axios.post("http://localhost:4000/utilRoutes");
    console.log("POST request sent successfully");
    return response.data;
  } catch (error) {
    console.error("Error sending POST request:", error);
    return error;
  }
};
const createMqttClient = () => {
  const clientId = "localNode_Printer";
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
  const updatePublicIP = process.env.MQTT_updatePublicIP;

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
    try {
      const responseData = await sendPostRequest();
      console.log("Cloud Api reports my Public IP: ", responseData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  // MQTT await message
  client.on("message", async (_topic, message) => {
    const receivedMessage = message.toString();
    switch (_topic) {
      case "testTopic": {
        console.log(`Received message ${receivedMessage} on topic: testTopic`);

        const buildOrder = await buildOrderForPrinter(receivedMessage);

        console.log("Received message:", buildOrder);
        // Print the received message
        await printMessage(buildOrder);
        break;
      }
      case "updatePublicIP": {
        console.log(
          `Received message ${receivedMessage} on topic: updatePublicIP`
        );
        setTimeout(() => {}, 3000);
        try {
          const responseData = await sendPostRequest();
          console.log("Received response data:", responseData);
        } catch (error) {
          console.error("An error occurred:", error);
        }

        break;
      }
    }
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
