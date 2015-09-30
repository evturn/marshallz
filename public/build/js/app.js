let $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Post = Backbone.Model.extend({}),
    Posts = Backbone.Collection.extend({
      model: Post,
      url: '/posts'
    }),
    BlogPosts = require('./views/blog-posts'),
    BlogPost = require('./views/blog-post');


let start = function() {
  let posts = new Posts();
  $('.kurt-loader').html('<img class="loader img-responsive" src="img/bananas.gif">');
  posts.fetch({
    success: function(data) {
      $('.kurt-loader').empty();
      console.log('we got bananYas: ', data);
      let modelsObj = data.models[0].attributes;
      for (var m in modelsObj) {
        console.log(m);
      }

      // let blogPosts = new BlogPosts({collection: models});
    },
    error: function(err) {
      console.log(err);
    }
  });
};

start();