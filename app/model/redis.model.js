'use strict';

module.exports = (function(){
    
    const redis = require('redis'),
          config = require('../../config/config'),
          debug = require('debug')('main:message-model'),
          that = {};
   
    that.setData = (key,value,cb) => {
        const client = redis.createClient(config.redisPort,config.redisHostName,{no_ready_check: true});
        
        client.auth(config.password, function(err){
           if(err) {
               debug('Error Authenticating Redis Database');
               cb(err);
           } 
        });
        
        client.on('connect', function(){
            debug('Connected to Reids Cloud Database.');
        });
        
        //setting message
        client.set(key,value,redis.print);
        
        client.quit(function (err, res) {
            if(err){
                debug('Error while exiting.');
                cb(err);
            }
            debug('Exiting from quit command.');
            cb(null,'success');
        });
        
    };
    
    that.getData = (key,cb) => {
        
        const client = redis.createClient(config.redisPort,config.redisHostName,{no_ready_check: true});
       
        client.auth(config.password, function(err){
           if(err) {
               debug('Error Authenticating Redis Database');
               cb(err);
           } 
        });
        
        client.on('connect', function(){
            debug('Connected to Reids Cloud Database.');
        });
        
        //retriving stored message
        client.get(key, function(err,result){
                if(err){
                    debug('Error retriving message from database');    
                }
                cb(err,result);
            });
        
        client.quit(function (err, res) {
            if(err){
                debug('Error while exiting.');
            }
            debug('Exiting from quit command.');
        }); 
    };
   
    
    return that;
    
})();