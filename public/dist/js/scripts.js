'use strict';

exports.Post = Backbone.Model.extend({});

exports.Posts = Backbone.Collection.extend({
  model: Post,
  url: '/posts'
});
'use strict';

var BlogPost = Backbone.View.extend({
  className: 'post-item-wrapper',
  postTemplate: _.template($('#post-template').html()),
  initialize: function initialize() {
    this.render();
  },
  render: function render() {
    this.$el.html(this.postTemplate(this.model.toJSON()));
    return this;
  }
});

module.exports = BlogPost;
'use strict';

var BlogPost = require('./blog-post');

var BlogPosts = Backbone.View.extend({
  el: 'body',
  count: 0,
  num: 1,
  total: null,
  numToRender: null,
  initialize: function initialize() {
    this.read();
  },
  events: {
    'click .paginator': 'paginate'
  },
  addOne: function addOne(model) {
    var view = new BlogPost({ model: model });
    this.$el.prepend(view.el);
  },
  addAll: function addAll() {
    this.collection.each((function (model) {
      this.addOne(model);
    }).bind(this));
  },
  read: function read() {
    this.total = posts.length;
    this.count += 10;
    this.numToRender = this.total - this.count;
    for (var i = this.numToRender; i < this.total; i++) {
      var model = posts.at(i);
      var view = new BlogPost({ model: model });
      $('.blog-posts').prepend(view.el);
    }
    $('.pagination-wrapper').append('<div class="paginator"><p class="btn-pagination">Next <span>10</span></p></div>');
  },
  paginate: function paginate() {
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
      var view = new BlogPost({ model: model });
      $(pageSelector).prepend(view.el);
    }
    if (this.numToRender !== 0) {
      $('.pagination-wrapper').append('<div class="paginator"><p class="btn-pagination">Next <span>10</span></p></div>');
    }
  }
});

module.exports = BlogPosts;
'use strict';

var posts = new Posts();

var promise = new Promise(function (resolve, reject) {
  $('.kurt-loader').html('<img class="loader img-responsive" src="img/bananas.gif">');
  var collection = posts.fetch({
    success: function success(data) {
      console.log('we got bananYas : ', data);
      resolve(collection);
    }
  });
});
promise.then(function () {
  $('.kurt-loader').empty();
  var blogPosts = new BlogPosts({ collection: posts });
});