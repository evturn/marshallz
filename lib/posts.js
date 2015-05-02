var Firebase    = require("firebase");
var MarkovChain = require('markovchain').MarkovChain;
var Promise     = require('promise');

// var promise = new Promise(function(resolve, reject) {
// 	var collection = app.posts.fetch({
// 		success: function(data) {
// 			console.log('we got: ', data);
// 			resolve(collection);
// 		}
// 	});
// });
// promise.then(function() {
// 	var blogPosts = new app.BlogPosts({collection: app.posts});
// });

var title = new MarkovChain({files: 'quotes.txt'});
var body  = new MarkovChain({files: 'quotes.txt'});
var bodyArray = [];



function capitalize(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z' 
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

function writePost() {
  title
    .start(capitalize) // 
    .end()
    .process(function(err, sentence) {
      console.log('Title: ', sentence);
      return sentence;
    })
  for (var i = 0; i < 2; i++) {
    body
      .start(capitalize) // 
      .end()
      .process(function(err, sentence) {
        console.log('Body: ', sentence);
        var idx = sentence.length - 1;
        if (sentence[idx] !== '?') {
         var sentence = sentence.concat('.');
        }
        bodyArray.push(sentence);
        return sentence;
      })

    var phrase = bodyArray.join(' ')
    console.log('phrase ', phrase);
    content = phrase;
  };

  var post = {title: title.sentence, body: content};
  return post;
}

function publish(post) {
  bodyArray.length = 0;
  var fb = new Firebase("https://marshallz.firebaseio.com/tests"); // change back to posts
  var newPost = fb.push(
  {
    title: post.title,
    body: post.body,
    timestamp: Firebase.ServerValue.TIMESTAMP
  });
  var postID = newPost.key();
  console.log(postID);
}

function createPost() {
	var content = writePost();
	publish(content);
}


module.exports = createPost;