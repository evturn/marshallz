var express 	= require('express');
var logger 		= require('morgan');
var hbs       = require('./config/handlebars');
var blog      = require('./controllers/posts.js');
var tweet     = require('./controllers/tweets.js');
var app 		  = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', hbs.engine);
app.use(logger('dev'));
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
	res.render('app/index');
});

app.get('/api', function(req, res) {
  var post = newPost();
  res.status(200).json(post);
});

setInterval(blog, 1200000);  // 3600000: 1 hour

setInterval(tweet, 20000000) ;// 21600000: 6 hours

var port = app.get('port');
app.listen(port, function() {
  console.log('Express listening on 3000');
});