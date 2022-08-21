const Net = require("net");

let client = new Net.Socket();
let adsClient = new Net.Socket();
export default function connectClient(mainWindow, res) {
  mainWindow.webContents.send("error", "뭐지");

  mainWindow.webContents.send("error", res);
  client = new Net.Socket();
  try {
    client.connect({ port: res.port, host: res.ip }, function () {});
    client.setEncoding("utf8");

    client.on("data", function (data) {
      try {
        let json = JSON.parse(data);
        if (json.type === "latlon") {
          mainWindow.webContents.send("latlon", json);
        } else if (json.type === "simulation") {
          let lat =
            Buffer.from(json.data.substring(25, 33), "hex").readInt32LE() *
            0.0000001;
          let lon =
            Buffer.from(json.data.substring(33, 41), "hex").readInt32LE() *
            0.0000001;
          let heading =
            Buffer.from(json.data.substring(57, 61), "hex").readInt16LE() *
            0.01;
          // console.log(json.data);
          // console.log(json.data.substring(57, 61));
          // console.log(heading * 0.01);
          // console.log(`lat : ${lat} / lon : ${lon} / heading : ${heading}`);
          mainWindow.webContents.send("latlon", {
            lat: lat,
            lon: lon,
            heading: heading,
          });
        } else {
          mainWindow.webContents.send(json.type, json.detection);
        }
        // else if (json.type === "detection") {
        //   mainWindow.webContents.send("detection", json.detection);
        // } else if (json.type === "mergintRequest") {
        //   mainWindow.webContents.send("mergintRequest", json.detection);
        // } else if (json.type === "mergintResphonse") {
        //   mainWindow.webContents.send("mergintResphonse", json.detection);
        // }else if (json.type === "mergintResphonse") {
        //   mainWindow.webContents.send("mergintResphonse", json.detection);
        // }
      } catch (err) {
        console.log(err);
      }

      // mainWindow.webContents.send("latlon", data)
    });
    client.on("end", function () {
      mainWindow.webContents.send("closeServer");

      client.end();
      adsClient.end();
      client.destroy();
      adsClient.destroy();
    });

    client.on("close", () => {
      mainWindow.webContents.send("closeServer");
      client.end();
      adsClient.end();
      client.destroy();
      adsClient.destroy();
    });

    adsClient.connect({ port: 8108, host: res.ip }, function () {});
    adsClient.setEncoding("utf8");

    adsClient.on("data", function (data) {
      try {
        let json = JSON.parse(data);
        if (json.type === "simulation car 1") {
          let lat =
            Buffer.from(json.data.substring(25, 33), "hex").readInt32BE() *
            0.0000001;
          let lon =
            Buffer.from(json.data.substring(33, 41), "hex").readInt32BE() *
            0.0000001;
          let heading =
            Buffer.from(json.data.substring(57, 61), "hex").readInt16BE() *
            0.01;
          // console.log(`lat : ${lat} / lon : ${lon} / heading : ${heading}`);
          mainWindow.webContents.send("latlon2", {
            lat: lat,
            lon: lon,
            heading: heading,
          });
        } else if (json.type === "simulation car 2") {
          let lat =
            Buffer.from(json.data.substring(25, 33), "hex").readInt32BE() *
            0.0000001;
          let lon =
            Buffer.from(json.data.substring(33, 41), "hex").readInt32BE() *
            0.0000001;
          let heading =
            Buffer.from(json.data.substring(57, 61), "hex").readInt16BE() *
            0.01;
          // console.log(`lat : ${lat} / lon : ${lon} / heading : ${heading}`);
          mainWindow.webContents.send("latlon3", {
            lat: lat,
            lon: lon,
            heading: heading,
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
    mainWindow.webContents.send("error", err);
  }
}

export function closeClient() {
  if (client !== null) {
    client.end();
    client.destroy();
  }
}
