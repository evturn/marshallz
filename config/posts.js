var Promise     = require('promise');
var Markov = require('markovchain').MarkovChain;

var Firebase    = require("firebase");
var firebase  = new Firebase("https://marshallz.firebaseio.com/posts");




function capitalize(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z';
  });
  return tmpList[~~(Math.random()*tmpList.length)];
}


var counter = 0;
var phrases = [];

function writeSentence() {

  var singlePhrase = function() {
    var markov = new Markov({files: 'quotes.txt'});

    markov
      .start(capitalize)
      .end()
      .process(function(err, sentence) {
        if (counter === 3) {
          var post = firebase.push({
            title     : phrases[0],
            body      : phrases[1] + ' ' + phrases[2],
            timestamp : Firebase.ServerValue.TIMESTAMP
          });
          console.log('Created with ID: ' + post.key());
        } else {
          counter += 1;
          if (sentence.charAt(sentence.length - 1) === '?' || '!') {
            phrases.push(sentence);
          } else {
            phrases.push(sentence + '.');
          }
          writeSentence();
          console.log(counter, sentence);
        }
      });
  };

  singlePhrase();

}

module.exports = writeSentence;