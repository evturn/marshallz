var app = app || {};

app.Api = Backbone.Model.extend({
	url: '/api/quotes',
	parse: function(response) {
		var repsonse = JSON.stringify(response);
		var post = {title: response.title.sentence, body: response.body.sentence};
    console.log(post);
    return post;
  },
});