var Twitter  = require('twitter');
var Promise  = require('promise');
var MarkovChain = require('markovchain').MarkovChain;

var client = new Twitter({
  consumer_key: process.env.MARSHALLZ_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.MARSHALLZ_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.MARSHALLZ_TWITTER_TOKEN_KEY,
  access_token_secret: process.env.MARSHALLZ_TWITTER_TOKEN_SECRET
});

var sentences = [];
var markov 	 = new MarkovChain({files: 'quotes.txt'});

function capitalize(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z' 
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

function createTweet() {
	markov
    .start(capitalize) // 
    .end()
    .process(function(err, sentence) {
    	phrase = sentence
  	});
  	return phrase;
}

function draftTweet() {	
	writeTweet().then(function(value) {	
		finishTweet(value);
	});
	
}

function writeTweet() {
	return new Promise(function(resolve, reject) {
		var snippet = createTweet();
		resolve(snippet);
	});
}

function finishTweet(tweet) {
  var status = '@evturn ' + tweet;
  console.log('Tweet String: ', status);
  postTweet(status);
}

function postTweet(phrase) {
	client.post('statuses/update', {status: phrase}, function(error, tweet, response) {
    if(error) { 
      throw error 
    } else {
      console.log('Tweet: ', tweet);  // Tweet body. 
      console.log(response);  // Raw response object. 
    }
  });
}

module.exports = draftTweet;