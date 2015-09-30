let Post = Backbone.Model.extend({});

let Posts = Backbone.Firebase.Collection.extend({
  model: Post,
  url: '/posts'
});