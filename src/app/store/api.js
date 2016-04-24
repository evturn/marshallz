import fetch from 'isomorphic-fetch';

const fetchLocals = cb => {
  return fetch('http://localhost:3000/api/locals')
    .then(res => res.json())
    .then(res => cb(res))
    .catch(e => console.log(e))
}

export const createPage = (html, initialState) => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Marshall's Blog</title>
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