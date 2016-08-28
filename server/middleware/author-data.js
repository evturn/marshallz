import { Author } from '../models'

export default function authorData(req, res, next) {
  const limit = 5
  const skip = req.query.page ? ((limit * req.query.page) - limit) : 0

  Author
    .find()
    .select('twitter.url blog.url name profile_img avatar_img username')
    .exec()
    .then(x => {
      req.marshallz = {
        authors: x
      }

      next()
    })
}
