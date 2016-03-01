'use strict';

module.exports = (function(){
    const elasticsearch = require('elasticsearch'),
          debug = require('debug')('main:elastic-model'),
          config = require('../../config/config'),
          
          client = new elasticsearch.Client({
            host: config.elasticConnectionUrl,
            log: 'trace'
          }),
          that={};
    
    that.exist = (cb) => {
        
        client.exists({
          index: 'myindex',
          type: 'message',
          id: 1
        }, function (err, exists) {
            if(err){
                debug('Error while inserting');
                cb(err)
            }else{
                cb(null,exists);
            }
          
        });
    };
    
    that.create = (message,cb) => {
        
       
            client.create({
                index: 'myindex',
                type: 'message',
                id:1,
                body: {
                    'message': message
                }
            }, function (err, response) {
                if(err){
                    debug('Error while inserting');
                    cb(err);
                }else{
                    debug('Data inserted');
                    cb(null,'inserted');
                }
                
            });
    };
    
    that.update = (message,cb)=>{
        client.update({
          index: 'myindex',
          type: 'message',
          id: 1,
          body: {
              doc:{
               'message': message   
              }
          }
        }, function (err, response) {
          if(err){
                debug('Error while updating');
                cb(err);
            }else{
                debug('Data inserted');
                cb(null,'updated');
            }
            
        });
    };
    
    that.search = (cb) => {
            
        debug('Searching');
        
        client.search({
            index:'myindex',
            type:'message',
            id:1
        }, function (err, response) {
          if(err){
                debug('Error while retriving');
                cb(err);
            }else{
                debug('Search Complete');
                const result = response.hits.hits;
                cb(null,result);
            }
            
        });
    };
   
    return that;
})();
