**hapigerJS** is a HapiGER driver for NodeJS.

## Installation

    `$ npm install hapigerjs`
    
## Create driver instance
```js
var hapigerjs = require('hapigerjs');

var url = process.env.HAPIGERJS_URL;
var port = process.env.HAPIGERJS_PORT;

var client = new hapigerjs.Driver({
    url: url,
    port: port
});
```

## Create a namespace
```js
client.POST("/namespaces",{namespace: "test"})
```
    
## Create some Events
```js
client.POST("/events", {
    events:[{
        "namespace": "test",
        "person": "Thomas",
        "action": "view",
        "thing": "ID-test"
    }]}
)
```

## Link similar habits between Thomas and Fabio
```js
client.POST("/events", {
    events:[{
        "namespace": "test",
        "person": "Fabio",
        "action": "view",
        "thing": "ID-test"
    }]}
)
```

## Now Fabio buys something that Thomas never seen before
```js
client.POST("/events", {
    events:[{
       "namespace": "test",
        "person": "Fabio",
        "action": "buy",
        "thing": "HairGel",
        "expires_at": "2016-10-12"
    }]}
)
```

## Retrieving recommendations for Thomas
```js
client.POST("/recommendations", {
        "namespace": "test",
        "person": "Thomas",
        "configuration": {
            "actions" : {"view": 5, "buy": 10}
        }
    }
).then(function(err,result){
    if(err){
        console.log(err);
    }else {
        console.log(result);
    }
});
```

## Returns
```
{ recommendations: 
   [ { thing: 'HairGel',
       weight: 0.4472135954999579,
       last_actioned_at: '2016-04-26T17:35:17+02:00',
       last_expires_at: '2016-10-12T02:00:00+02:00',
       people: [Object] } ],
  neighbourhood: { Fabio: 0.4472135954999579, Thomas: 1 },
  confidence: 0.0003639896269238396 }
```


## Gulp will run tests for the project 
```js
gulp

 8   -_-_-_-_-_,------,
 0   -_-_-_-_-_|   /\_/\ 
 0   -_-_-_-_-^|__( ^ .^) 
     -_-_-_-_-  ""  "" 

  8 passing (167ms)

```



## License 
The MIT License (MIT)