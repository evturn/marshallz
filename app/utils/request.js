import fetch from 'isomorphic-fetch'

export default url => {
  return fetch(url)
    .then(x => x.json())
    .catch(e => console.log(e))
}

