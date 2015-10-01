'use strict';

let express    = require('express'),
    logger     = require('morgan')('dev'),
    mongoose   = require('mongoose'),
    hbs        = require('./routes/views'),
    crony      = require('./routes/lib/cron'),
    routes     = require('./routes/routes'),
    init       = require('./config/base'),
    app        = express();


init.database(mongoose);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', hbs.engine);
app.use(express.static(__dirname + '/public/dist'));
app.use(logger);
app.use('/', routes);

let port = app.get('port');
app.listen(port, function() {
  console.log('Express listening on 3000');
});