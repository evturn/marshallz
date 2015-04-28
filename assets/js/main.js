var app = app || {};

var ref = new Firebase('https://marshallz.firebaseio.com/posts');

app.posts = new app.Posts();
app.posts.fetch();
var blogPosts = new app.BlogPosts({collection: app.posts});