const view = require('./view');
const spin = require('spin');
const jspin = require('jquery.spin');
const url = view.templates.posts;

const Pagination = exports = module.exports = {
  page: null,
  params: null,
  template: null,
  $postsContainer: $('.blog-posts'),
  activePage: $('body').data('page'),
  deactivate: false,
  init: function init() {
    const scrollBottom = $(document).height() - ($(window).height() + $(window).scrollTop());

    if (this.deactivate) { return; }
    if (this.activePage === 'posts') { return; }
    if (this.params === null) { this.getParams(); }
    if (scrollBottom === 0) { this.request(); }
  },
  getParams: function getParams() {
    switch (this.activePage) {
      case 'home':
        this.params = '/page';
        this.page = 1;
        this.template = url.index;
        break;
      case 'author':
        const [x, author, username] = window.location.pathname.split('/');
        this.params = `/${author}/${username}/page`;
        this.page = 1;
        this.template = url.author;
        break;
    }
  },
  renderNext: function renderNext(data) {
    view.loadTemplate(this.template)

      .then((template) => {
        this.$postsContainer.append(template(data));
        this.spinner('kill');
        return this;
      })

      .catch((err) => console.log(err));
  },
  request: function request() {
    this.page += 1;
    this.spinner('start');
    $.ajax({
      url: `${this.params}/${this.page}`,
      dataType: 'json',
      success: (data) => {
        if (data.message) { this.deactivate = true; }
        this.renderNext(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  },
  spinner: function spinner(arg) {
    const $container = $('.pagination');
    const $loader = $('.kurt-loader');
    const $spinner = $('.spinner');

    switch (arg) {
      case 'start':
        $loader.fadeTo(0, 0.3);
        $container.spin({ top: '45%' });
        break;
      case 'kill':
        $loader.fadeTo(0.3, 1);
        $spinner.hide();
        break;
    }
  },
};
