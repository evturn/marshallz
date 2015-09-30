let _ = require('underscore');
let BlogPost = Backbone.View.extend({
  className: 'post-item-wrapper',
  postTemplate: _.template($('#post-template').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    console.log(this.model);
    this.$el.html(this.postTemplate(this.model.toJSON()));
    return this;
  }
});

module.exports = BlogPost;