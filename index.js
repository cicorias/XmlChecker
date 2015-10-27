#!/usr/bin/env node

var libxml = require('libxmljs'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert');
	

var xsltnode = require('xslt4node');
var commandLineArgs = require("command-line-args");
 
var cli = commandLineArgs([
    { name: "xml", type: String },
    { name: "xsd", type: String  },
    { name: "xsl", type: String  },
	{ name: "path", type: String, defaultOption: '' },
	{ name: "out", type: String }
]);

var options = cli.parse();
console.log('using:');
console.log(options);

var xml = fs.readFileSync(path.join(options.path, options.xml));
var xsd = fs.readFileSync(path.join(options.path, options.xsd));
var xsl = fs.readFileSync(path.join(options.path, options.xsl));
var outFile = path.join(options.path, options.out);

var xsdDoc = libxml.parseXml(xsd);
var xslDoc = libxml.parseXml(xsl);
var xmlDocValid = libxml.parseXml(xml);

console.log('validate doc');
assert.equal(xmlDocValid.validate(xsdDoc), true);
console.log('validate 2');
assert.equal(xmlDocValid.validationErrors.length, 0);
console.log('done..')

var config = {
    xslt: xsl,
    source: xml,
    result: outFile,
    props: {
        indent: 'yes'
    }
};

var rv = xsltnode.transformSync(config);
console.log(rv);
