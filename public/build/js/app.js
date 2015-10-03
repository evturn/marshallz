let $ = require('jquery'),
    _ = require('underscore'),
    Handlebars = require('handlebars'),
    helpers = require('handlebars-helpers'),
    utils = require('utils'),
    livestamp = require('livestamp');


const paginate = function() {
  let windowY = $(window).height(),
      windowTop = $(window).scrollTop(),
      documentY = $(document).height(),
      scrollBottom = documentY - (windowY + windowTop);

  let requestNextPage = function(page) {
    $.ajax({
      url: `/pages/${page}`,
      success(data) {
        console.log(data);
      },
      error(err) {
        console.log(err);
      }
    });
  };

  if (scrollBottom === 0) {
    let page = $('.page').data('page');

    requestNextPage(page);
  }

};

$(document).on('ready', function() {
  paginate();
});

$(window).on('scroll', function() {
  paginate();
});