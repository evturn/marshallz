var express 		= require('express');
var Firebase    = require("firebase");
var logger 			= require('morgan');
var MarkovChain = require('markovchain').MarkovChain
  , title 			= new MarkovChain({files: 'quotes.txt'});
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


var firebasePost = function(post) {
  bodyArray.length = 0;
  var fb = new Firebase("https://marshallz.firebaseio.com/posts");
    fb.push(
      {
        title: post.title,
        body: post.body,
        timestamp: Firebase.ServerValue.TIMESTAMP
      });  
}




setInterval(publish, 1000);


function publish() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  if (s === 01 && m === 16) {
    var post = newPost();
    firebasePost(post);
  } else {
    console.log('Marshall is writing.');
  }
}



var useUpperCase = function(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z' 
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

var body = new MarkovChain({files: 'quotes.txt'});
var bodyArray = [];
var newPost = function() {
  title
    .start(useUpperCase) // 
    .end()
    .process(function(err, sentence) {
      console.log('Title: ', sentence);
      return sentence;
    })
  for (var i = 0; i < 2; i++) {
    body
      .start(useUpperCase) // 
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
};


var port = app.get('port');
app.listen(port, function() {
  console.log('Express listening on 3000')
});