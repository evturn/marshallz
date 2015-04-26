var app = app || {};

app.Posts = Backbone.Collection.extend({
	model: app.Post,
	url: 'https://marshallz.firebaseio.com/posts'
});