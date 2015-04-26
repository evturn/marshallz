var app = app || {};


data = [
{title: 'We are all screwed for 59 cents', body: 'jkfdsla; fjdsklafdsjal fdsa fdsa  fdsa  dsaf dfsa dfs  fdsa fdsa fdsa  fdsa '},
{title: 'We are all screwed for getting a ticket', body: 'jkfdsla; fjdsklafdsjal fdsa fdsa  fdsa  dsaf dfsa dfs  fdsa fdsa fdsa  fdsa '},
{title: 'We are all screwed for eleven hours', body: 'jkfdsla; fjdsklafdsjal fdsa fdsa  fdsa  dsaf dfsa dfs  fdsa fdsa fdsa  fdsa '}

];

var fakePosts = new app.Posts(data);
new app.BlogPosts({collection: fakePosts});