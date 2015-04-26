var express 		= require('express');
var request			= require('request');
var logger 			= require('morgan');
var MarkovChain = require('markovchain').MarkovChain
  , title 			= new MarkovChain({ files: 'quotes.txt' })
  , body        = new MarkovChain({ files: 'quotes.txt' });
var app 				= express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.static(__dirname + '/assets'))



app.get('/', function(req, res) {
	res.render('index');
});

app.get('/api/quotes', function(req, res) {
  var post = {title: title.sentence, body: body.sentence};
  res.status(200).json(post);
});

var useUpperCase = function(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z' 
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

title
  .start(useUpperCase) // 
  .end(7)
  .process(function(err, sentence) {
    console.log('Title: ', sentence);
    return sentence;
  })

body
  .start(useUpperCase) // 
  .end()
  .process(function(err, sentence) {
    console.log('Body: ', sentence)
    return sentence;
  })


app.listen(app.get('port'), function() {
  console.log('Express listening on 3000')
});