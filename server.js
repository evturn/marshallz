'use strict';

let express    = require('express'),
    logger     = require('morgan')('dev'),
    mongoose   = require('mongoose'),
    crony      = require('./routes/lib/cron'),
    routes     = require('./routes/routes'),
    config     = require('./config/base'),
    app        = express();

config.database(mongoose);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', config.hbs.engine);
app.use('/', express.static(__dirname + '/client/dist'));
app.use('/posts/:id', express.static(__dirname + '/client/dist'));
app.use('/pages', express.static(__dirname + '/views/partials'));
app.use(logger);
app.use('/', routes.app);
app.use('/pages', routes.pages);
app.use('/posts', routes.detail);

let port = app.get('port');
app.listen(port, function() {
  console.log('Express listening on 3000');
});