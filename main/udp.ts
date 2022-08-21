import dgram from "node:dgram";

const port = 63011;
const host = "192.168.0.139";

let server = dgram.createSocket("udp4");

export default function udpOpen(mainWindow) {
  server.on("message", (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    let data = msg.toString();
    console.log(data);
    let carNum;
    let lat, lon, heading;

    if (data.substring(6, 10) === "2b00") {
      lat =
        Buffer.from(data.substring(24, 32), "hex").readInt32LE() * 0.0000001;
      lon =
        Buffer.from(data.substring(32, 40), "hex").readInt32LE() * 0.0000001;
      heading = Buffer.from(data.substring(56, 60), "hex").readInt16LE() * 0.01;
      console.log(lat, lon, heading);
    } else if (data.substring(6, 10) === "002b") {
      lat =
        Buffer.from(data.substring(24, 32), "hex").readInt32BE() * 0.0000001;
      lon =
        Buffer.from(data.substring(32, 40), "hex").readInt32BE() * 0.0000001;
      heading = Buffer.from(data.substring(56, 60), "hex").readInt16BE() * 0.01;
    }
    carNum = data.substring(12, 20);
    if (carNum === "00000000") {
      mainWindow.webContents.send("latlon", {
        lat: lat,
        lon: lon,
        heading: heading,
      });
    } else if (carNum === "00000001") {
      mainWindow.webContents.send("latlon2", {
        lat: lat,
        lon: lon,
        heading: heading,
      });
    } else if (carNum === "00000002") {
      mainWindow.webContents.send("latlon3", {
        lat: lat,
        lon: lon,
        heading: heading,
      });
    }
  });

  server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.bind(port, host);
}
