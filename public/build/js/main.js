let posts = new Posts();

var promise = new Promise(function(resolve, reject) {
  $('.kurt-loader').html('<img class="loader img-responsive" src="img/bananas.gif">');
  var collection = posts.fetch({
    success: function(data) {
      console.log('we got bananYas : ', data);
      resolve(collection);
    }
  });
});
promise.then(function() {
  $('.kurt-loader').empty();
  var blogPosts = new BlogPosts({collection: posts});
});