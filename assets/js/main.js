var app = app || {};

var ref = new Firebase('https://marshallz.firebaseio.com/posts');

app.posts = new app.Posts();

var promise = new Promise(function(resolve, reject) {
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