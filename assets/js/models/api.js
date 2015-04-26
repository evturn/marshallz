var app = app || {};

app.Api = Backbone.Model.extend({
	urlRoot: '/api/quotes',
	parse: function(response) {
    return response;
  },
});