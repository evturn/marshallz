'use strict';

let express   = require('express'),
    logger    = require('morgan'),
    hbs       = require('./routes/views'),
    blog      = require('./config/posts'),
    crony     = require('./config/cron'),
    routes = require('./routes/routes'),
    app       = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', hbs.engine);
app.use(express.static(__dirname + '/public/dist'));
app.use(logger('dev'));
app.use('/', routes);

let port = app.get('port');
app.listen(port, function() {
  console.log('Express listening on 3000');
});