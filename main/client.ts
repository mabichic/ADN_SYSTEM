const Net = require("net");

let client = new Net.Socket();
export default function connectClient(mainWindow, res) {

  mainWindow.webContents.send("error", "뭐지");

  mainWindow.webContents.send("error", res);
  client = new Net.Socket();

  client.connect({ port: res.port, host: res.host }, function () {});
  client.setEncoding("utf8");

  client.on("data", function (data) {
    try{
      let json = JSON.parse(data);
      if(json.type==="latlon"){
        mainWindow.webContents.send("latlon", json)
      }else if(json.type==="detection"){
        mainWindow.webContents.send("detection", json.detection);
      }
      else if(json.type==="request"){
        mainWindow.webContents.send("request", json.detection);
      }

    }catch(err){
      console.log(err)
      mainWindow.webContents.send("error",err);
    }

    // mainWindow.webContents.send("latlon", data)
  });
  client.on("end", function () {
    mainWindow.webContents.send("closeServer");
    client.end();
    client.destroy();
  });

  client.on("close", () => {
    mainWindow.webContents.send("closeServer");
    client.end();
    client.destroy();
  });
}

export function closeClient() {
  if (client !== null) {
    client.end();
    client.destroy();
  }
}
