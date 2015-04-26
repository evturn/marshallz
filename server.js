var express 		= require('express');
var bodyParser 	= require('body-parser');
var request			= require('request');
var logger 			= require('morgan');
var MarkovChain = require('markovchain').MarkovChain
  , quotes 			= new MarkovChain({ files: 'quotes.txt' })
var app 				= express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.static(__dirname + '/assets'))

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/api/quotes', function(req, res) {
	res.json(phrase.sentence);
})

var useUpperCase = function(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
  	return word[0] >= 'A' && word[0] <= 'Z' 
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

var phrase = quotes
  .start(useUpperCase) // 
  .end()
  .process(function(err, s) {
    console.log(s)
    return s;
  })

app.listen(app.get('port'), function() {
	console.log('Express listening on 3000')
});