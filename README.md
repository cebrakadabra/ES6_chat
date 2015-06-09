# ES6-chat
A simple chat application using a full development stack with ECMAScript6 inside.

## TODO
* switch to ES6
* testing
* doccoo

## Installation instructions

### Simply clone it and run:

#### get dependencies:
```$ npm install```


#### Install mongoDB Server:
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

or if you are a lazy reader and you use mac:

```brew update```

```brew install mongodb```

#### setup database and run mongodb server
```sudo mkdir -p /data/db```

```sudo mongod```

#### install sass
```gem install sass```

#### build stuff:
```$ grunt ``` grunt default stack runs same as grunt prod

```$ grunt dev ``` for watching on files continiously

```$ grunt prod ``` for production build

#### run app:
```$ mongod ```

```$ npm start ```



## Components
####Frontend
* AngularJS - ES6 used
* Babel (for ES6 transcript)
* lodash
* jQuery
* less / scss

####Backend
* nodeJS
* MongoDB
* socket.io
* express

####Doku
* doccoo
* /doc directory

####Code Coverage
* Istanbul

####Testing
* Jasmine
