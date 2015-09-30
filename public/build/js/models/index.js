var app = app || {};

app.Api = Backbone.Model.extend({
  urlRoot: '/api/quotes',
  parse: function(response) {
    return response;
  },
});

app.Post = Backbone.Model.extend({
  model: app.Api
});

app.Posts = Backbone.Firebase.Collection.extend({
  model: app.Post,
  url: 'https://marshallz.firebaseio.com/posts'
});