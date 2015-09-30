var app = app || {};

app.Posts = Backbone.Firebase.Collection.extend({
	model: app.Post,
	url: 'https://marshallz.firebaseio.com/posts'
});