import { Author, Post } from '../models'
import request from 'request'
import Generator from './sg'

export default async function blog(author, data) {
  const generator = Generator(data)
  const blogPostText = createTextData(generator)
  try {
    const blogPostMedia = await callGihpyAPI(blogPostText.title)
    const blogPost = Object.assign({}, {
      ...blogPostText,
      ...blogPostMedia,
       author: author._id,
    })
    const newPost = await saveBlogPost(blogPost)
  } catch (e) {
    console.log(e)
  }
}

function saveBlogPost(blogPost) {
  const newPost = new Post(blogPost)
  return newPost
    .save()
    .then(post => {
      return Author
        .findById(post.author)
        .exec()
        .then(author => {
          author.posts.push(post)
          return author.save()
        })
    })
}

function createTextData(generator) {
  function writeBody(acc) {
    acc.push(generator())
    if (acc.length < 4) {
      writeBody(acc)
    }
    return acc.join('. ')
  }

  const title = generator()
  const slug = toSlug(title)
  const body = writeBody([])
  return { title, slug, body }
}

function toSlug(text) {
  return text.trim()
    .replace(/[%\\\s\/?#\[\]@!\$&\'\(\)\*\+,;="]{1,}/g, '-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase()
}

function callGihpyAPI(title) {
  const tag = `tag=${title.split(' ').join('+')}`
  const api_key = `api_key=${'dc6zaTOxFJmzC'}` // It's public, chill out.
  const url = `http://api.giphy.com/v1/gifs/random?${api_key}&${tag}`

  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        try {
          const json = JSON.parse(body)
          if (json) {
            resolve({ image_url: json.data.image_url })
          } else {
            resolve()
          }
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
