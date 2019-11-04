const { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const url = require('url');

app.on("ready", () => {
	let mainWindow = new BrowserWindow({
		show: false, webPreferences: {
			nodeIntegration: true
		}
	})
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}));
	mainWindow.webContents.openDevTools();
	mainWindow.maximize();
	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	});

});



app.on("window-all-closed", () => { app.quit() })