const { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path');
const url = require('url');
var express = require('express');
var japp = express();
var fs = require("fs");

var bodyParser = require('body-parser');




var json = {
	'data': []
}
var knex = require("knex")({
	client: "sqlite3",
	connection: {
		filename: path.join(__dirname, 'database.sqlite')
	},
	useNullAsDefault: true
});

select=()=>{
	knex.from('customers').select("*")
	.then((rows) => {
		json = {
			'data': []
		}
		for (row of rows) {
			json['data'].push(row);
		}


	}).catch((err) => { console.log(err); throw err })
	.finally(() => {
		// knex.destroy();
	});

}

var server = japp.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port);
});


japp.use(bodyParser.json());
japp.get('/json', function (req, res) {
	res.json(json);

});
japp.post('/form', function (req, res) {
	data = req.body;
	output = knex('customers').insert(data).then(()=>{select()});
	res.send("Success");
});
app.on("ready", () => {
	select();
	let mainWindow = new BrowserWindow({
		show: false, webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}));
	
	// mainWindow.setMenu(null)

	mainWindow.maximize();
	mainWindow.once("ready-to-show", () => {
		mainWindow.webContents.openDevTools();
		mainWindow.show();

	});

});



app.on("window-all-closed", () => { app.quit() })