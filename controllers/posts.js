var Promise     = require('promise');
var MarkovChain = require('markovchain').MarkovChain;
var markov      = new MarkovChain({files: 'quotes.txt'});

var Firebase    = require("firebase");
var firebase  = new Firebase("https://marshallz.firebaseio.com/posts");

var sentences = [];

function capitalize(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z' 
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

function createSentence() {
	markov
    .start(capitalize) // 
    .end()
    .process(function(err, sentence) {
    	phrase = sentence
  	});
  	return phrase;
}

function draftPost() {	
	writeSentence().then(function(value) {	
		sentences.push(value);
	});
	writePost();
}

function writeSentence() {
	return new Promise(function(resolve, reject) {
		var snippet = createSentence();
		resolve(snippet);
	});
}

function writePost() {
	var length = sentences.length;
	if (length === 3) {
		var title = sentences[0];
		var sentence1 = createBody(sentences[1]);
		var sentence2 = createBody(sentences[2]);
		var body = sentence1 + ' ' + sentence2;
		var post = {title: title, body: body};
		publish(post);
		sentences.length = 0;
	}
}

function createBody(sentence) {
  	if (sentence !== '?') {
 			var content = sentence.concat('.');	
  	}		      
  return content;
}

function publish(post) {
  var newPost = firebase.push(
  {
    title: post.title,
    body: post.body,
    timestamp: Firebase.ServerValue.TIMESTAMP
  });
  var postID = newPost.key();
  console.log(postID);
}


module.exports = draftPost;