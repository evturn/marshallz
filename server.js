var express 		= require('express');
var Firebase    = require("firebase");
var logger 			= require('morgan');
var MarkovChain = require('markovchain').MarkovChain
  , title 			= new MarkovChain({files: 'quotes.txt'});
var Twitter     = require('twitter');
var Promise     = require('promise');
var posts       = require('./lib/posts.js');
var app 				= express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.static(__dirname + '/assets'))

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/api/quotes', function(req, res) {
  var post = newPost();
  res.status(200).json(post);
});


setInterval(posts, 10000);  // change back to 3600000

// twitter
var client = new Twitter({
  consumer_key: process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
  access_token_secret: process.env.MARSHALLZ_TWITTER_TOKEN_SECRET
});


setInterval(writeTweet, 21600000)

function writeTweet() {
  
  var update = newPost();
  var status = update.title;
  console.log('Tweet String: ', status);
  sendTweet(status);
  // client.post('statuses/update', {status: update},  function(error, tweet, response){
  //     if(error) { 
  //       throw error 
  //     } else {
  //       console.log('Tweet: ', tweet);  // Tweet body. 
  //       console.log(response);  // Raw response object. 
  //     }
  //     tweetArray.length = 0;
  // });
}
var sendTweet = function(phrase) {
client.post('statuses/update', {status: phrase},  function(error, tweet, response){
      if(error) { 
        throw error 
      } else {
        console.log('Tweet: ', tweet);  // Tweet body. 
        console.log(response);  // Raw response object. 
      }
  });
}



var port = app.get('port');
app.listen(port, function() {
  console.log('Express listening on 3000')
});