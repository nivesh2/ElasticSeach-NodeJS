# Documentation

### About
Basic API Server using **Redis**, **Elastic Search** and **Node.JS**.

### Configuration
  * One can use Redis as a Service from [Redislabs](redislabs.com) with 30MB of storage for free.
  * One can install Elastic Search in ubuntu [myGist](https://gist.github.com/nivesh2/b3fe307743f998042cc1)


### API EndPoints: 
 * http://cloudboost-nivesh2.c9users.io/index
    - method: POST
    - BODY: message as form data or as json in body.
      ```json
      {
        "message": "Coldplay - Hymn For The Weekend"
      }
      ```
    - return: 
      ```json
      {
        "status": "inserted",
        "message": "Coldplay - Hymn For The Weekend"
      }
      ```
    
 * http://cloudboost-nivesh2.c9users.io/index
    - method: GET
    - return: 
      ```json
      {
        "message": "Coldplay - Hymn For The Weekend"
      }
      ```
  * http://cloudboost-nivesh2.c9users.io/search
    - method: GET
    - return: 
      ```json
      {
        "message": "Coldplay - Hymn For The Weekend"
      }
      ```
 
> API Endpoints might be down at times

### Run: 
```shell 
  DEBUG='main:*' node app.js
```  

### Run with nodemon:
```shell 
  DEBUG='main:*' nodemon node app.js
```  

### Routes:
 * POST – /index This takes in a sample message and indexes into ElasticSearch and Redis.
 * GET  - /index This gets the data from Redis.
 * GET - /search This searches data from ElasticSearch.

> Any contribution to this project are welcomed.

