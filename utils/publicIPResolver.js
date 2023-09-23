function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const axios = require("axios");
const getLocalNodePublicIP = async () => {
  try {
    const response = await axios.get(process.env.GET_MY_PUBLIC_IP);
    const publicIP = response.data.ip; // Extract the public IP from the response
    console.log("Public IP:", publicIP);
    return publicIP;
  } catch (error) {
    console.error("Error getting public IP:", error.message);
    return error;
  }
};
const postLocalNodePublicIP = async (publicIP) => {
  await sleep(5000);
  try {
    const response = await axios.post(process.env.PUBLIC_IP_SERVER_UPDATE, {
      publicIP: publicIP,
    });

    /*  const response = await axios.post(
      "https://taco-mazama-api.onrender.com/utilRoutes"
    ); */
    console.log("POST request sent successfully");
    return response.data;
  } catch (error) {
    console.error("Error sending POST request:", error);
    return error;
  }
};
module.exports = { getLocalNodePublicIP, postLocalNodePublicIP };
