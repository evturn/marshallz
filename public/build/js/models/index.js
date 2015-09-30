Post = Backbone.Model.extend({});

Posts = Backbone.Firebase.Collection.extend({
  model: Post,
  url: 'https://marshallz.firebaseio.com/posts'
});