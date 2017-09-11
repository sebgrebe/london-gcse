var express = require('express')
var app = express()
var XLSX = require('xlsx')

const port = 8080;

app.use(express.static('app'))
app.get( '/', function( req, res ) {
    res.sendFile('app/index.html' );
  });
app.get('/data',function(req,res) {
	var workbook = XLSX.readFile('data.xlsx');
	var sheet_with_areanames = workbook.Sheets['iadatasheet1'];
	var sheet_with_gcses = workbook.Sheets['iadatasheet5'];
	var sheet_with_income = workbook.Sheets['iadatasheet4'];
	var area_names = [];
	var gcse_perc = [];
	var income = [];
	for (var i=4;i<40;i++) {
		area_names.push(sheet_with_areanames['B'+i]['v'])
	}
	for (var i=4;i<40;i++) {
		gcse_perc.push(sheet_with_gcses['I'+i]['v']);
	}
	for (var i=4;i<40;i++) {
		income.push(sheet_with_income['DX'+i]['v']);
	}
	var dataset = [];
	for (var i=0;i<income.length;i++) {
		var obj = new Object();
		obj['area'] = area_names[i];
		obj['gcse'] = gcse_perc[i];
		obj['income'] = income[i];
		var j=0;
		while (obj[Object.keys(obj)[j]] != 'n/a' && j < 3) {
			j++
		}
		if (j===3) {dataset.push(obj)}
	}
	res.send(dataset)
})
app.listen(port);

// app.listen(port, (err) => {  
//   if (err) {
//     return console.log('something bad happened', err)
//   }

//   console.log(`server is listening on ${port}`)
// })  