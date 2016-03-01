'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const debug = require('debug')('main:app'),
      config = require('./config/config'),
      port = process.env.PORT || config.port,
      //start express server
      app = require('./config/express')();

//add middlewares to express
require('./middleware/base.middleware')(app);

//add routes
require('./app/routes/base.route')(app);

//handle errors
require('./app/routes/handleError')(app);

app.listen(port);
debug(`Server running in ${app.get('env')} environment, listening on port: ${port}`);