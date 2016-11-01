import axios from 'axios'
import { api } from '../generator'

export default function blog({author, gen}) {
  const title = gen.run()
  return callAPI(title.split(' ').join('+'))
    .then(image_url => ({image_url, author, title, slug: toSlug(title), body: gen.take(5)}))
    .then(saveBlogPost)
}

function callAPI(query) {
  return axios(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${query}`)
    .then(x => x.data.data.image_url)
    .catch(_ => 'https://raw.githubusercontent.com/evturn/marshallz-blog-node/master/public/images/marshallz-bg.jpg')
}

function saveBlogPost(x) {
  return api
    .database()
    .ref()
    .child('posts')
    .push(x)
}

function toSlug(text) {
  return text.trim()
    .replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase()
}