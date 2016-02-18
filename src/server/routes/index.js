import Server from '../../../public/assets/app.server';
import { all, populateAuthors, detail, send } from '../controllers/blogPosts';

export default function routes(app) {
  app.get('/blogPost', all, populateAuthors, send);
  app.get('/api/post/:slug', detail);

  app.get('*', (req, res, next) => Server(req, res));

  return app;
}