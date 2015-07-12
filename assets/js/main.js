var app = app || {};

var ref = new Firebase('https://marshallz.firebaseio.com/posts');

app.posts = new app.Posts();

var promise = new Promise(function(resolve, reject) {
  $('.blog-posts').html('<img class="loader img-responsive" src="img/245.gif">');
  var collection = app.posts.fetch({
    success: function(data) {
      console.log('we got: ', data);
      resolve(collection);
    }
  });
});
promise.then(function() {
  var blogPosts = new app.BlogPosts({collection: app.posts});
});