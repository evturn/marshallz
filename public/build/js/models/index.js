Api = Backbone.Model.extend({
  urlRoot: '/api/quotes',
  parse: function(response) {
    return response;
  },
});

Post = Backbone.Model.extend({
  model: Api
});

Posts = Backbone.Firebase.Collection.extend({
  model: Post,
  url: 'https://marshallz.firebaseio.com/posts'
});