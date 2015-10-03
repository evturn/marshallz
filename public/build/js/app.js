let $ = require('jquery'),
    _ = require('underscore'),
    Handlebars = require('handlebars'),
    helpers = require('hbs-client')(),
    utils = require('utils'),
    spin = require('spin'),
    jspin = require('jquery.spin'),
    livestamp = require('livestamp');


const paginate = function() {
  if ($('#detail').length) {
      return false;
  }

  let windowY = $(window).height(),
      windowTop = $(window).scrollTop(),
      documentY = $(document).height(),
      scrollBottom = documentY - (windowY + windowTop),
      templates = [];

  let requestNextPage = function(page) {
    $('.kurt-loader').fadeTo(0, 0.3);
    $('.pagination').spin({
      top: '45%'
    });
    $.ajax({
      url: `/pages?page=${page}`,
      success(data) {
        renderPosts(data);
      },
      error(err) {
        console.log(err);
      }
    });
  };

  let loadTemplate = function (url, callback) {
    if (templates[url]) {
        return callback(templates[url]);
    }

    $.get(url, function(contents) {
      templates[url] = Handlebars.compile(contents);
        callback(templates[url]);
      }, '');
  };

  let renderPosts = function(data) {
    loadTemplate('/pages/pagination.hbs', function(template) {
        let html = template(data);
        $('.blog-posts').append(html);
        $('#pagination').data('page', data.page);
        $('.kurt-loader').fadeTo(0.3, 1);
        $('.spinner').hide();
    });
  };

  if (scrollBottom === 0) {
    let page = $('#pagination').data('page');

    requestNextPage(page);
  }

};

$(document).on('ready', function() {
  paginate();
});

$(window).on('scroll', function() {
  paginate();
});