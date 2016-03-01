'use strict';

/*
 * This controller is additional,
 * one can use it to make api
 * more modular.
 * By having seperate controller
 * for Elastic Search module.
*/


module.exports = (function(){
    const elastic = require('../../app/model/elastic.model');
    const debug = require('debug')('main:elastic-controller');

    const that={};
    
    that.create = (req,res,next) => {
        var message = req.body.message || req.query.message ||'';
        
        elastic.exist(function(err,result){
           if(err){
               next(err);
           }
           if(result === true){
               elastic.update(message,function(err,result){
                  if(err){
                      next(err);
                  } 
                  res.json({'status':result});
               });
           }else{
               elastic.create(message,function(err,result){
                  if(err){
                      next(err);
                  } 
                  res.json({'status':result}); 
               });
           }
        });
        
    };
    
    that.search = (req,res,next) => {
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
