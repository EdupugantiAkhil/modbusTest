// create an empty modbus client
// var ModbusRTU = require("modbus-serial");
import ModbusRTU from "modbus-serial";
var client = new ModbusRTU();

async function main() {
  let tmp = client.connectRTUBuffered(
    "/dev/ttyUSB0",
    { baudRate: 115200 },
    read
  );
  console.log(tmp);
}

// open connection to a serial port
// client.connectRTU("/dev/ttyUSB0", { baudrate: 9600 }, write);

function write() {
  client.setID(1);

  // write the values 0, 0xffff to registers starting at address 5
  // on device number 1.
  client.writeRegisters(5, [0, 0xffff]).then(read);
}

function read() {
  // read the 2 registers starting at address 5
  // on device number 1.
  client.readHoldingRegisters(5, 2).then(console.log);
  console.log(client);
}

// read();

main();
