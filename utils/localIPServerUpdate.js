const axios = require("axios");
const localIPServerUpdate = async (client) => {
  try {
    const response = await axios.post("process.env.LOCAL_IP_SERVER_UPDATE");

    /*  const response = await axios.post(
      "https://taco-mazama-api.onrender.com/utilRoutes"
    ); */
    console.log("POST request sent successfully");
    return response.data.ip;
  } catch (error) {
    console.error("Error sending POST request:", error);
    return error;
  }
};

module.exports = localIPServerUpdate;
