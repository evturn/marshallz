var app = app || {};

var posts = new app.Posts();
posts.fetch();

var blogPosts = new app.BlogPosts({collection: posts});
// blogPosts.quote();