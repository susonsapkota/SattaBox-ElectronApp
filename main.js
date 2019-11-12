const { app, BrowserWindow } = require("electron")
const path = require('path');
const url = require('url');
var express = require('express');
var japp = express();
var bodyParser = require('body-parser');

var json = {
	'data': []
}

fordb=app.getPath('userData')

const pathToDbFile = path.join(fordb,
	'/database.sqlite',
  );
// console.log(pathToDbFile)
var knex = require("knex")({
	client: "sqlite3",
	connection: {
		filename: pathToDbFile
	},
	useNullAsDefault: true
});
// console.log(knex)
select = () => {
	knex.from('customers').select("*")
		.then((rows) => {
			json = {
				'data': []
			}
			for (row of rows) {
				json['data'].push(row);
			}

		}).finally(() => {
			// knex.destroy();
		});
}
select()
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
	output = knex('customers').insert(data).then(() => { select() });
	sendf = () => { res.send("Success"); }
	setTimeout(sendf, 500);
});

japp.post('/formupdate', function (req, res) {
	data = req.body;
	// console.log(data);
	id = data['id'];
	delete data['id'];
	knex('customers').where({ id: id }).update(data).then(() => { select(); });
	sendf = () => { res.send("Success"); }
	setTimeout(sendf, 1000);
	// select();
});

japp.post('/formdelete', function (req, res) {
	data = req.body;
	console.log(data);
	knex('customers').where({ id: data['id'] }).del().then(() => { select(); });
	sendf = () => { res.send("Success"); }
	setTimeout(sendf, 1000);
});

app.on("ready", () => {
	select();
	let mainWindow = new BrowserWindow({
		show: false,
		// resizable: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.setMenu(null)

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}));

	
	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	});
});

app.on("window-all-closed", () => {
	knex.destroy();
	app.quit();
})