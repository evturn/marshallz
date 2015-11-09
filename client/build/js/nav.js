'use strict';

module.exports = {
  init() {
    this.toggleNav();
  },
  toggleNav() {
    const $itemButton = $('.site-nav__author-item');
    const $dropdowns = $('.site-nav__sublist.js-menu');

    $itemButton.on('click', function() {
      const $dropdown = $(this).next('.site-nav__sublist.js-menu');
      const isActive = !!($dropdown.hasClass('active'));
      $dropdowns.removeClass('active');
      if (!isActive) {
        $dropdown.addClass('active');
      }
    });
  }
};