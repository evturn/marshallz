let moment = require('moment');
let BlogPost = Backbone.View.extend({
  className: 'post-item-wrapper',
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  template: function() {
    let model = this.model,
        timestamp = moment(model.get('timestamp')).unix(),
        html = `
        <div class="inner">
          <div class="img-container">
            <img class="img-scale avatar" src='img/av.png'>
            </div>
          <div class="content-container">
            <p class="title-text">${model.get('title')}</p>
            <p class="meta" data-livestamp="${timestamp}"></span></p>
            <p class="body-text">${model.get('body')}</p>
            <p class="meta sig">by <a href="http://twitter.com/marshallzBlog">Marshall</a></p>
          </div>
        </div>`;
    return html;
  }
});

module.exports = BlogPost;