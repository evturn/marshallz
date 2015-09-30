let $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    helpers = require('handlebars-helpers'),
    utils = require('utils'),
    livestamp = require('livestamp'),
    Post = Backbone.Model.extend({}),
    Posts = Backbone.Collection.extend({
      model: Post,
      url: '/posts'
    });