const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');

let mainWindow;
let pythonProcess;

app.on('ready', () => {
    pythonProcess = spawn('python', ['app.py']);

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL('https://www.google.com/');

    mainWindow.on('closed', () => {
        pythonProcess.kill();
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});