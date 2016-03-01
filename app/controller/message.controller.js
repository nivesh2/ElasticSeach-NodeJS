'use strict';

module.exports = (function(){
    
    const elastic = require('../../app/model/elastic.model'),
          messg = require('../../app/model/redis.model'),
          debug = require('debug')('main:message-controller'),
          that={};
    /*
     * This takes in a sample message and indexes into ElasticSearch and Redis.
     */
    that.setData = (req,res,next) => {
        const message = req.body.message || req.query.message ;
        
        if(message === undefined){
            res.json({
              status : 'failure',
              message: 'message attribute not found in request body'
            });
        }
        
        debug('indexing message into redis');
        messg.setData('message',message, function(err,result){
            if(err !== null){
                next(err); 
            }
        });
        
        debug('indexing into Elastic simultaneously');
        elastic.exist(function(err,result){
           if(err){
               next(err);
           }
           if(result === true){
               elastic.update(message,function(err,result){
                  if(err){
                      next(err);
                  } 
               });
           }else{
               elastic.create(message,function(err,result){
                  if(err){
                      next(err);
                  } 
               });
           }
        });
        
        res.json({
            'status':'inserted',
            'message':message
        });
        
    };
    
    /*
     * This gets the data from Redis
     */
    that.getData = (req,res,next) => {
        
        messg.getData('message',function(err,result){
            if(err !== null){
               next(err); 
            }else {
                res.json({
                    'message': result.toString()
                });
            }
            
        });
    };
    
    /*
     * This searches data from ElasticSearch. 
     */
    that.searchData = (req,res,next) => {
        elastic.search(function(err,result){
           if(err){
               next(err);
           } 
           
           if(result.length !== 0){
               res.json(result[0]._source);
           }else{
               res.json({'message':'No message found'});
           }
        });
    };
 
    return that;
})();