'use strict';

module.exports = {
  init() {
    this.toggleDropdowns();
    this.setNavOpen();
  },
  setNavOpen() {
    const $navTrigger = $('.site-nav__mobile');
    const $nav = $('.site-nav__menu');

    $navTrigger.on('click', () => {
      const isOpen = !!($nav.hasClass('open'));
      if (!isOpen) {
        $nav.addClass('open');
      } else {
        $nav.removeClass('open');
      }
    });
  },
  toggleDropdowns() {
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