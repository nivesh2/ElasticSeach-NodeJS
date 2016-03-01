'use strict';

module.exports = function (app){
  
  const message = require('../../app/controller/message.controller');
  
  // POST – /index This takes in a sample message and indexes into ElasticSearch and Redis.
  app.post('/index', message.setData);
  
  // GET  - /index This gets the data from Redis
  app.get('/index', message.getData);
  
  // GET - /search This searches data from ElasticSearch. 
  app.get('/search', message.searchData);
  
};