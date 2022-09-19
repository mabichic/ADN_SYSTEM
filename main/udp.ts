import dgram from "node:dgram";

const port = 63011;
// const host = "192.168.0.139";

let server = dgram.createSocket("udp4");

export default function udpOpen(mainWindow) {
  server.on("message", (msg, rinfo) => {
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

    if (mission !== 0) {
      console.log("thisMission : " + mission);
    }
    let sendFn;
    if (carNum === 0) {
      sendFn = "latlon";
    } else if (carNum === 1) {
      sendFn = "latlon2";
      mainWindow.webContents.send("detection", true);
    } else if (carNum === 2) {
      sendFn = "latlon3";
      mainWindow.webContents.send("detection", true);
    }

    if (carNum === 1 || carNum === 2) {
      if (mission === 1 || mission === 2) {
        mainWindow.webContents.send("mergintRequest");
      }
      if (mission === 4 || mission === 5) {
        //끼어들기 interruptRequest
        mainWindow.webContents.send("interruptRequest");
      }
      if (mission === 7 || mission === 8) {
        //추월
        mainWindow.webContents.send("overtakingRequest");
      }
      if (mission === 10 || mission === 11) {
        //양보요청
        mainWindow.webContents.send("concessionRequest");
      }
      if (mission === 12 || mission == 13) {
        //양보요청 2
        mainWindow.webContents.send("concession2Request");
      }
    } else if (carNum === 0) {
      if (mission === 1 || mission === 2) {
        //우합류
        mainWindow.webContents.send("mergintResphonse");
      }
      if (mission === 4 || mission === 5) {
        //끼어들기 interruptRequest
        mainWindow.webContents.send("interruptReshponse");
      }
      if (mission === 7 || mission === 8) {
        //추월
        mainWindow.webContents.send("overtakingReshponse");
      }
      if (mission === 10 || mission === 11) {
        //양보요청
        mainWindow.webContents.send("concessionResphonse");
      }
      if (mission === 12 || mission == 13) {
        //양보요청 2
        mainWindow.webContents.send("concession2Resphonse");
      }
    }
    if (typeof sendFn !== "undefined") {
      mainWindow.webContents.send(sendFn, {
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

  server.bind(port);
}
