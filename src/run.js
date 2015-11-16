#! /usr/bin/env node

// Read args
var args = process.argv.slice(2);
if (args.length < 2)
        throw Error ("Specify source and destination");

var jQueryControls = require ('./index');
var jc = new jQueryControls ();
jc.run (args [0], args[1]);
