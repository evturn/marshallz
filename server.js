var express 	= require('express');
var logger 		= require('morgan');
var hbs       = require('./config/handlebars');
var blog      = require('./config/posts.js');
var tweet     = require('./config/tweets.js');
var crony     = require('./config/cron');
var appRouter = require('./routes/app');
var app 		  = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', hbs.engine);
app.use(logger('dev'));
app.use(express.static(__dirname + '/dist'));
app.use('/', appRouter);


app.get('/api', function(req, res) {
  var post = newPost();
  res.status(200).json(post);
});

var port = app.get('port');
app.listen(port, function() {
  console.log('Express listening on 3000');
});