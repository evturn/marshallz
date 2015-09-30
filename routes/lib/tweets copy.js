var Markov = require('markovchain').MarkovChain;

var client = require('../../config/credentials');

module.exports = function marshallz() {

  var singlePhrase = function() {
    var markov = new Markov({files: 'routes/lib/quotes.txt'});

    markov
      .start(capitalize)
      .end()
      .process(function(err, sentence) {
        client.post('statuses/update', {status: sentence},
          function(error, tweet, response) {
            if(error) {
              throw error;
            } else {
              console.log('Tweet: ', tweet);  // Tweet body.
              console.log(response);          // Raw response object.
            }
          });
      });

    function capitalize(wordList) {
      var tmpList = Object.keys(wordList).filter(function(word) {
        return word[0] >= 'A' && word[0] <= 'Z';
      });
      return tmpList[~~(Math.random()*tmpList.length)];
    }

  };

  singlePhrase();

};