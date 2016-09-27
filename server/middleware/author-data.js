import { Author } from '../models'

export default function authorData(req, res, next) {
  Author
    .find()
    .select('twitter.url blog.url name profile_img avatar_img username')
    .exec()
    .then(authors => {
      req.marshallz = { authors }
      next()
    })
}
