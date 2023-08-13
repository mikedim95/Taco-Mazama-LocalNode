const escpos = require('escpos');
escpos.Network = require('escpos-network');

const printerIpAddress = '192.168.1.200'; // Replace with the actual IP address
const printerPort = 9100; // Replace with the appropriate port number

const printMessage = async (message) => {
  const networkDevice = new escpos.Network(printerIpAddress, printerPort);
  const printer = new escpos.Printer(networkDevice);

  // Open the connection
  await new Promise((resolve, reject) => {
      networkDevice.open((error) => {
          if (error) {
              reject(error);
          } else {
              resolve();
          }
      });
  });

  // Send commands to the printer
  printer
      .font('a')
      .align('ct')
      .text(message)
      .cut()
      .close(() => {
          console.log('Print command sent successfully');
      });
};

module.exports = printMessage;
