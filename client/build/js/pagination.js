const Handlebars = require('handlebars');
const helpers = require('hbs-helpers').precompiled;
const spin = require('spin');
const jspin = require('jquery.spin');

module.exports = () => {

  const windowY = $(window).height();
  const windowTop = $(window).scrollTop();
  const documentY = $(document).height();
  const scrollBottom = documentY - (windowY + windowTop);
  const $container = $('.pagination');
  const $pageValContainer = $('#pagination');
  const $loader = $('.kurt-loader');
  const $spinner = $('.spinner');
  const $postsContainer = $('.blog-posts');
  const $detailPage = $('#detail');
  const templates = [];

  if ($detailPage.length) {
    return false;
  }

  const requestNextPage = (page) => {
    $loader.fadeTo(0, 0.3);
    $container.spin({
      top: '45%'
    });
    $.ajax({
      url: `/pages?page=${page}`,
      success(data) {
        console.log(data);
        renderPosts(data);
      },
      error(err) {
        console.log(err);
      }
    });
  };

  const loadTemplate = (url, callback) => {
    if (templates[url]) {
      return callback(templates[url]);
    }

    $.get(url, (contents) => {
      templates[url] = Handlebars.compile(contents);
        callback(templates[url]);
      }, '');
  };

  const renderPosts = (data) => {
    loadTemplate('/pagination.hbs', (template) => {
      let html = template(data);
      $postsContainer.append(html);
      $pageValContainer.data('page', data.page);
      $loader.fadeTo(0.3, 1);
      $spinner.hide();
    });
  };

  if (scrollBottom === 0) {
    let page = $pageValContainer.data('page');
    requestNextPage(page);
  }

};