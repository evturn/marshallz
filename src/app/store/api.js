import fetch from 'isomorphic-fetch';

export const fetchLocals = _ => {
  return fetch(`http://localhost:${__PORT__}/api/locals`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const createPage = (html, initialState) => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Marshall's Blog</title>
      <link rel="icon" type="image/png" href="dist/favicon.png">
      <link rel="stylesheet" type="text/css" href="/dist/css/app.css" />
    </head>
    <body>
      <div id="root">${html}</div>
      <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
      <script src="/dist/js/app.js"></script>
    </body>
    </html>
  `
}

export const scrollWindowTop = _ => window.scrollTo(0, 0);

export const thunkmasterFlex = ({ dispatch, getState }) => {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action)
  }
}

export const analytics = () => {
  (function(i,s,o,g,r,a,m) {
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r] || function() {
      (i[r].q=i[r].q||[]).push(arguments)
    }, i[r].l=1*new Date();
    a=s.createElement(o), m=s.getElementsByTagName(o)[0];
    a.async=1;
    a.src=g;
    m.parentNode.insertBefore(a,m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js','ga')

  ga('create', 'UA-72542250-1', 'auto');
  ga('send', 'pageview');
}