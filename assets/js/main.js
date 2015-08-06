var app = app || {};

var ref = new Firebase('https://marshallz.firebaseio.com/posts');

app.posts = new app.Posts();

var promise = new Promise(function(resolve, reject) {
  $('.kurt-loader').html('<img class="loader img-responsive" src="img/bananas.gif">');
  var collection = app.posts.fetch({
    success: function(data) {
      console.log('we got bananas : ', data);
      resolve(collection);
    }
  });
});
promise.then(function() {
  $('.kurt-loader').empty();
  var blogPosts = new app.BlogPosts({collection: app.posts});
});