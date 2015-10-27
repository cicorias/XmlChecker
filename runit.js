#!/usr/bin/env node

var child_process = require('child_process');
var fs = require('fs');

var xml, xsd, xsl, path, out;

path = './drop';
out = 'out.html';

var files = fs.readdirSync('./drop');

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

console.log('using cmd line: ' + parms);

child_process.execSync('node index.js ' + parms);


