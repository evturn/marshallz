var app = app || {};

app.posts = new app.Posts();
app.posts.fetch();
var blogPosts = new app.BlogPosts({collection: app.posts});