let $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    helpers = require('handlebars-helpers'),
    livestamp = require('livestamp'),
    Post = Backbone.Model.extend({}),
    Posts = Backbone.Collection.extend({
      model: Post,
      url: '/posts'
    }),
    BlogPosts = require('./views/blog-posts'),
    BlogPost = require('./views/blog-post');