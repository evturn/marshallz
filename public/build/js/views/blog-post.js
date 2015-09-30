let BlogPost = Backbone.View.extend({
  className: 'post-item-wrapper',
  postTemplate: _.template($('#post-template').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.postTemplate(this.model.toJSON()));
    return this;
  }
});