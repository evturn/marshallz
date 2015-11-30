const Handlebars = require('handlebars');
const helpers = require('hbs-helpers').precompiled;
const spin = require('spin');
const jspin = require('jquery.spin');

const cachedTemplates = [];
const $container = $('.pagination');
const $loader = $('.kurt-loader');
const $spinner = $('.spinner');
const $postsContainer = $('.blog-posts');
const activePage = $('body').data('page');
let filepath = `${activePage}-pagination.hbs`;
let page = null;
let params = null;

const showSpinner = () => {
  $loader.fadeTo(0, 0.3);
  $container.spin({
    top: '45%'
  });
};

const killSpinner = () => {
  $loader.fadeTo(0.3, 1);
  $spinner.hide();
};

const determineRoute = () => {
  switch (activePage) {
    case 'home':
      params = '/page';
      break;
    case 'author':
      const paths = window.location.pathname.split('/');
      const [x, author, username] = paths;
      params = `/${author}/${username}/posts`;
      break;
  }
};

const requestNextPage = (page) => {
  const url = `${params}/${page}`;
  showSpinner();
  $.ajax({
    url: url,
    success(data) {
      console.log(data);
      renderNextPage(data);
    },
    error(err) {
      console.log(err);
    }
  });
};

const loadTemplate = (filepath, fn) => {
  if (cachedTemplates[filepath]) { return fn(cachedTemplates[filepath]); }

  $.get(filepath, (contents) => {
    cachedTemplates[filepath] = Handlebars.compile(contents);
    fn(cachedTemplates[filepath]);
  });
};

const renderNextPage = (data) => {
  loadTemplate(filepath, (template) => {
    $postsContainer.append(template(data));
    killSpinner();
  });
};

const init = () => {
  const windowY = $(window).height();
  const documentY = $(document).height();
  const windowTop = $(window).scrollTop();
  const scrollBottom = documentY - (windowY + windowTop);
  const $noPage = $('#detail, #bio');

  if ($noPage.length) { return; }
  if (params === null) { determineRoute(); }

  if (scrollBottom === 0) {
    if (page === null) {
      page = 1;
    } else {
      page += 1;
    }
    requestNextPage(page);
  }
};

module.exports = init;