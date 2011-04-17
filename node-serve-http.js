/*
 * Copyright (c) 2011 Jakob Praher
 *
 */

var http = require('http');
var sys = require('sys');
var static = require('node-static');

var file = new (static.Server)('.');

require('http').createServer(function (req,res) {
    req.addListener('end', function() {
    file.serve(req, res, function(err,  response) {
        if (err) {
            sys.error("> Error serving " + req.url + " - " + err.message);
            console.log(res.writeHead);
	    res.writeHead(err.status, err.headers);
        }
	else {
	    sys.puts("> " + req.url + " - " + response.message);
	}
    });
    });
}).listen(8125, "127.0.0.1");

console.log('Server running at http://127.0.0.1:8125/');
