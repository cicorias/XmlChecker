#!/usr/bin/env node

var child_process = require('child_process');
var spawn = require('child_process').spawn;
var fs = require('fs');

var xml, xsd, xsl, path, out;

path = './drop';
out = 'out.html';

//extract();


var files = fs.readdirSync('drop');

for(var i=0; i < files.length; i++){
	var filename = files[i].toLowerCase();
	var ext = filename.split('.').pop();
	
	switch (ext) {
		case 'xml':
			xml = filename;
			break;
		case 'xsd':
			xsd = filename;
			break;
		case 'xsl':
		case 'xslt':
			xsl = filename;
			break;
		default:
			break;
	}
}


var parms = '--path ' + path + ' --xml ' + xml + ' --xsd ' + xsd + ' --xsl ' + xsl + ' --out ' + out ;

console.log('java SaxParse ./drop/' + xml + ' ./drop/' + xsd);
console.log('java Transform ./drop/' + xsl + ' ./drop/' + xml);
console.log('using cmd line: ' + parms);

child_process.execSync('java SaxParse ./drop/' + xml + ' ./drop/' + xsd, {stdio:[0,1,2]});
child_process.execSync('java Transform ./drop/' + xsl + ' ./drop/' + xml, {stdio:[0,1,2]});
child_process.execSync('node index.js ' + parms);


function extract(){
	//var rm = 'rm ./drop/*';
	var unzip = 'unzip ./drop/drop.zip -d ./drop'
	
	//child_process.execSync(rm);
	child_process.execSync(unzip);
	
}

function writeOutput (child){
	//spit stdout to screen
	child.stdout.on('data', function (data) {   process.stdout.write(data.toString());  });
	
	//spit stderr to screen
	child.stderr.on('data', function (data) {   process.stdout.write(data.toString());  });
	
	child.on('close', function (code) { 
		console.log("Finished with code " + code);
	});
}



