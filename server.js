var express = require('express');
var bodyParser = require('body-parser');
var request	= require('request');
var logger = require('morgan');
var MarkovChain = require('markovchain').MarkovChain
  , quotes = new MarkovChain({ files: 'quotes.txt' })
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.static(__dirname + '/assets'))

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(app.get('port'), function() {
	console.log('Express listening somewhere. Come on, you know where.')
});