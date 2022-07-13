import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import connectClient, { closeClient } from './client';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
    ipcMain.on("connectClient", (event, res)=> connectClient(mainWindow,res)); 
    ipcMain.on("closeClient", (event, res)=> closeClient()); 
    
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
    ipcMain.on("connectClient", (event, res)=> connectClient(mainWindow,res)); 
    ipcMain.on("closeClient", (event, res)=> closeClient()); 
    mainWindow.webContents.send("error", "why...");
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
