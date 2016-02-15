import chromecon from 'file!assets/images/av-marshall.png';
import applecon from 'file!assets/images/av-bad.png';
import mscon from 'file!assets/images/av-clang.png';
import favicon from 'file!assets/images/favicon.png';

const config = {
  link: [
    { 'rel': 'icon', 'href': favicon, 'type': 'image/png' },
    { 'rel': 'icon', 'sizes': '192x192', 'href': chromecon },
    { 'rel': 'apple-touch-icon', 'sizes': '152x152', applecon },
    { 'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Monofett', 'type': 'text/css' },
    { 'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Droid+Serif:400,700', 'type': 'text/css' },
    { 'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800', 'type': 'text/css' },
    { 'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Roboto+Slab:400,300,100', 'type': 'text/css' },
    { 'rel': 'stylesheet', 'href': '/assets/css/app.css' }
  ],
  meta: [
    { 'charset': 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
    { 'name': 'description', 'content': 'Marshallz blog. It\'s blog time.' },
    { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' },
    { 'name': 'mobile-web-app-capable', 'content': 'yes' },
    { 'name': 'apple-mobile-web-app-capable', 'content': 'yes' },
    { 'name': 'apple-mobile-web-app-status-bar-style', 'content': 'black' },
    { 'name': 'apple-mobile-web-app-title', 'content': 'Marshallz blog. It\'s blog time.' },
    { 'name': 'msapplication-TileImage', 'content': mscon },
    { 'name': 'msapplication-TileColor', 'content': '#C8C5C7' }
  ]
};

export default config;
