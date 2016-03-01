'use strict';
module.exports = function(app){
    const debug = require('debug')('main:handdleError');

    //Error: 404
    app.use((req,res,next)=>{
       debug('Page Not found, Erro: 404');

       var err = new Error('Page Not Found');
       err.status = 404;
       err.name = 'PageNotFound';
       next(err);
    });


    // Devlopment error handler
    if (app.get('env') === 'development') {
        app.use(function(err,req,res,next){
            debug(`Error name: ${err.name} | message: ${err.message}`);

            res.status(err.status || 500).json({
            error:err,
            message: err.message,
            trace: err.stack,
            });

        });

    }else {
    // Production error handler
        app.use(function(err, req, res,next) {
            debug(`Error name: ${err.name} | message: ${err.message}`);

            res.status(err.status || 500).json({
              error: {},
              message: err.message,
            });

        });

    }

};