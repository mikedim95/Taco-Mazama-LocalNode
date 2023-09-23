function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getLocalNodePublicIP = async () => {
  try {
    const response = await fetch(process.env.GET_MY_PUBLIC_IP);
    const data = await response.json();
    const publicIP = data.ip; // Extract the public IP from the response
    console.log("Public IP:", publicIP);
    return publicIP;
  } catch (error) {
    console.error("Error getting public IP:", error.message);
    return error;
  }
};

const postLocalNodePublicIP = async (publicIP) => {
  try {
    // Simulate a delay of 5 seconds
    await sleep(5000);

    const response = await fetch(process.env.PUBLIC_IP_SERVER_UPDATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicIP }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("POST request sent successfully", responseData);
    return responseData.publicIP;
  } catch (error) {
    console.error("Error sending POST request:", error);
    throw error; // Re-throw the error for higher-level handling if needed
  }
};

module.exports = { getLocalNodePublicIP, postLocalNodePublicIP };
