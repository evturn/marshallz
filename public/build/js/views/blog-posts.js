let _ = require('underscore');
let BlogPost = require('./blog-post');

let BlogPosts = Backbone.View.extend({
  el: 'body',
  count: 0,
  num: 1,
  total: null,
  numToRender: null,
  initialize: function() {
    this.read();
  },
  events: {
    'click .paginator' : 'paginate'
  },
  addOne: function(model) {
    var view = new BlogPost({model: model});
    this.$el.prepend(view.el);
  },
  addAll: function() {
    this.collection.each(function(model) {
      this.addOne(model);
    }.bind(this));
  },
  read: function() {
    console.log(this.collection);
    this.total = this.collection.models.length;
    this.count += 10;
    this.numToRender = this.total - this.count;
    for (var i = this.numToRender; i < this.total; i++) {
      var model = this.collection.at(i);
      var view = new BlogPost({model: model});
      $('.blog-posts').prepend(view.el);
    }
    $('.pagination-wrapper').append('<div class="paginator"><p class="btn-pagination">Next <span>10</span></p></div>');
  },
  paginate: function() {
    $('.paginator').remove();
    this.total = this.numToRender;
    if (this.numToRender > 10) {
      this.numToRender = this.total - this.count;
    } else {
      this.numToRender = 0;
    }
    this.num += 1;
    var page = 'pagination-' + this.num;
    var pageSelector = '.' + page;
    var element = document.createElement('div');
    $(element).addClass(page);
    $('.blog-posts').append(element);
    for (var i = this.numToRender; i < this.total; i++) {
      var model = posts.at(i);
      var view = new BlogPost({model: model});
      $(pageSelector).prepend(view.el);
    }
    if (this.numToRender !== 0) {
    $('.pagination-wrapper').append('<div class="paginator"><p class="btn-pagination">Next <span>10</span></p></div>');
    }
  },
});

module.exports = BlogPosts;