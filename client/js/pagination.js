const Handlebars = require('handlebars');
const view = require('view');
const spin = require('spin');
const jspin = require('jquery.spin');

const Pagination = exports = module.exports = {
  cache: [],
  page: null,
  params: null,
  template: null,
  $postsContainer: $('.blog-posts'),
  activePage: $('body').data('page'),
  init: function init() {
    const windowY = $(window).height();
    const documentY = $(document).height();
    const windowTop = $(window).scrollTop();
    const scrollBottom = documentY - (windowY + windowTop);

    if (this.activePage === 'posts') { return; }
    if (this.params === null) { this.getParams(); }

    if (scrollBottom === 0) {
      this.page += 1;
      this.spinner('start');
      this.request();
    }
  },
  getParams: function getParams() {
    switch (this.activePage) {
      case 'home':
        this.params = '/page';
        this.page = 1;
        this.template = view.index;
        break;
      case 'author':
        [x, author, username] = window.location.pathname.split('/');
        this.params = `/${author}/${username}/posts`;
        this.page = 1;
        this.template = view.author;
        break;
    }
  },
  loadTemplate: function load(url) {
    if (this.cache[url]) { return this.cache[url]; }

    return new Promise((resolve, reject) => {
      $.get(url, (contents) => {
        this.cache[url] = Promise.resolve(Handlebars.compile(contents));
        resolve(this.cache[url]);
      });
    });
  },
  renderNext: function renderNext(data) {
    this.loadTemplate(this.template)

      .then((template) => {
        this.$postsContainer.append(template(data));
        this.spinner('kill');
        return this;
      })

      .catch((err) => console.log(err));
  },
  request: function request() {
    $.ajax({
      url: `${this.params}/${this.page}`,
      success: (data) => {
        console.log(data);
        this.renderNext(data);
      },
      error(err) {
        console.log(err);
      }
    });
  },
  spinner: function spinner(arg='start') {
    const $container = $('.pagination');
    const $loader = $('.kurt-loader');
    const $spinner = $('.spinner');

    if (arg === 'start') {
      $loader.fadeTo(0, 0.3);
      $container.spin({ top: '45%' });
    } else if (arg === 'kill') {
      $loader.fadeTo(0.3, 1);
      $spinner.hide();
    }
  },
};

