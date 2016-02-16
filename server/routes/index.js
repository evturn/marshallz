import Server from '../../public/assets/app.server';
import blogPosts from '../controllers/blogPosts';

export default function routes(app) {
  app.get('/blogPost', blogPosts.all, blogPosts.populateEachBotWithPosts, blogPosts.send);
  app.get('/api/post/:slug', blogPosts.one);

  app.get('*', (req, res, next) => Server(req, res));

  return app;
}