const { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const url = require('url');



app.on("ready", () => {
	let mainWindow = new BrowserWindow({ show: false })
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}));
	mainWindow.once("ready-to-show", () => { mainWindow.show() })

	ipcMain.on("mainWindowLoaded", function () {
		let result = knex.select().from("customers")
		result.then(function(rows){
			console.log(rows);
		})
	});


});



app.on("window-all-closed", () => { app.quit() })