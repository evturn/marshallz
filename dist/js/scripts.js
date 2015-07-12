var app = app || {};

app.Api = Backbone.Model.extend({
	urlRoot: '/api/quotes',
	parse: function(response) {
    return response;
  },
});
var app = app || {};

app.Post = Backbone.Model.extend({
	model: app.Api
});
var app = app || {};
var app = app || {};

app.Posts = Backbone.Firebase.Collection.extend({
	model: app.Post,
	url: 'https://marshallz.firebaseio.com/posts'
});
var app = app || {};

app.BlogPost = Backbone.View.extend({
  postTemplate: _.template($('#post-template').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.postTemplate(this.model.toJSON()));
    return this;
  }
});
var app = app || {};

app.BlogPosts = Backbone.View.extend({
  el: '.blog-posts',
  initialize: function() {
    this.read();
  },
  events: {
    'click .btn-pagination' : 'paginate'
  },
  addOne: function(model) {
    var view = new app.BlogPost({model: model});
    this.$el.prepend(view.el);
  },
  addAll: function() {
    this.collection.each(function(model) {
      this.addOne(model);
    }.bind(this));
  },
  read: function() {
    count = 0;
    var total = app.posts.length;
    num = 1;
    count += 10;
    numToRender = total - count;
    for (var i = numToRender; i < total; i++) {
      var model = app.posts.at(i);
      var view = new app.BlogPost({model: model});
      $('.blog-posts').prepend(view.el);
    }
    $('.blog-posts').append('<p class="text-center btn-pagination">Older Posts</p>');
  },
  paginate: function() {
    $('.btn-pagination').remove();
    var total = numToRender;
    if (numToRender > 10) {
      numToRender = total - count;
    } else {
      numToRender = 0;
    }
    num += 1;
    var page = 'pagination-' + num;
    var pageSelector = '.' + page;
    var element = document.createElement('div');
    $(element).addClass(page);
    $('.blog-posts').append(element);
    for (var i = numToRender; i < total; i++) {
      var model = app.posts.at(i);
      var view = new app.BlogPost({model: model});
      $(pageSelector).prepend(view.el);
    }
    if (numToRender !== 0) {
      $('.blog-posts').append('<p class="text-center btn-pagination">Older Posts</p>');
    }
  },
});
var app = app || {};

var ref = new Firebase('https://marshallz.firebaseio.com/posts');

app.posts = new app.Posts();

var promise = new Promise(function(resolve, reject) {
  $('.blog-posts').html('<img class="loader img-responsive" src="img/245.gif">');
  var collection = app.posts.fetch({
    success: function(data) {
      console.log('we got: ', data);
      resolve(collection);
    }
  });
});
promise.then(function() {
  var blogPosts = new app.BlogPosts({collection: app.posts});
});