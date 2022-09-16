import dgram from "node:dgram";

const port = 63011;
// const host = "192.168.0.139";

let server = dgram.createSocket("udp4");

export default function udpOpen(mainWindow) {
  server.on("message", (msg, rinfo) => {
    //    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    console.log(msg);
    let data = msg.toJSON();
    /*
    0: None

1: Class A(우합류) 시작

2: Class A(우합류) 진행 중

3: Class A(우합류) 종료

4: Class B(끼어들기) 시작

5: Class B(끼어들기) 진행 중

6: Class B(끼어들기) 종료

7: Class C(추월) 시작

8: Class C(추월) 진행 중

9: Class C(추월) 종료

10: Class D(양보요청) 시작

11: Class D(양보요청) 진행 중

12: Class D(양보요청) 종료
    */

    // let data = msg.toString();
    // console.log(data);
    let carNum;
    let mission;
    let lat, lon, heading;
    if (data.data[3] === 43) {
      lat = msg.slice(12, 16).readInt32LE() * 0.0000001;
      lon = msg.slice(16, 20).readInt32LE() * 0.0000001;
      heading = msg.slice(28, 30).readInt16LE() * 0.0125;
      carNum = msg.slice(6, 10).readInt32LE();
      mission = msg.slice(1, 3).readInt16LE();
    } else if (data.data[4] === 43) {
      lat = msg.slice(12, 16).readInt32BE() * 0.0000001;
      lon = msg.slice(16, 20).readInt32BE() * 0.0000001;
      heading = msg.slice(28, 30).readInt16BE() * 0.0125;
      carNum = msg.slice(6, 10).readInt32BE();
      mission = msg.slice(1, 3).readInt16BE();
    }

    console.log(carNum);
    let sendFn;
    if (carNum === 0) {
      sendFn = "latlon";
    } else if (carNum === 1) {
      sendFn = "latlon2";
      mainWindow.webContents.send("detection", true);
      if (mission === 1) {
        mainWindow.webContents.send("mergintRequest", true);
      }
    } else if (carNum === 2) {
      sendFn = "latlon3";
      mainWindow.webContents.send("detection", true);
    }
    if (typeof sendFn !== "undefined") {
      mainWindow.webContents.send(sendFn, {
        lat: lat,
        lon: lon,
        heading: heading,
      });
    }

    // if()

    // if (data.substring(6, 10) === "2b00") {
    //   lat =
    //     Buffer.from(data.substring(24, 32), "hex").readInt32LE() * 0.0000001;
    //   lon =
    //     Buffer.from(data.substring(32, 40), "hex").readInt32LE() * 0.0000001;
    //   heading = Buffer.from(data.substring(56, 60), "hex").readInt16LE() * 0.01;
    //   console.log(lat, lon, heading);
    // } else if (data.substring(6, 10) === "002b") {
    //   lat =
    //     Buffer.from(data.substring(24, 32), "hex").readInt32BE() * 0.0000001;
    //   lon =
    //     Buffer.from(data.substring(32, 40), "hex").readInt32BE() * 0.0000001;
    //   heading = Buffer.from(data.substring(56, 60), "hex").readInt16BE() * 0.01;
    // }
    // carNum = data.substring(12, 20);
    // if (carNum === "00000000") {
    //   mainWindow.webContents.send("latlon", {
    //     lat: lat,
    //     lon: lon,
    //     heading: heading,
    //   });
    // } else if (carNum === "00000001") {
    //   mainWindow.webContents.send("latlon2", {
    //     lat: lat,
    //     lon: lon,
    //     heading: heading,
    //   });
    // } else if (carNum === "00000002") {
    //   mainWindow.webContents.send("latlon3", {
    //     lat: lat,
    //     lon: lon,
    //     heading: heading,
    //   });
    // }
  });

  server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.bind(port);
}
