# ES6-chat
A simple chat application using a full development stack with ECMAScript6 inside.

## Installation instructions

Simply clone it and run:

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

### Mac - Terminal Look alike
![Mac Terminal setup look alike](/images/terminal_setup.png?raw=true "This are the three main terminal windows/tabs you will need on Mac ")
This are the three main terminal windows/tabs you will need on Mac.



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
* docco
* /docs directory

```$ grunt doc ```


![Docco generation](/images/docco.png?raw=true "Docco creates documentation also on all grunt tasks (default, prod, dev)")
Docco creates documentation also on all grunt tasks (default, prod, dev)


####Code Coverage
* Istanbul
```$ grunt coverage ```

![Istanbul coverage](/images/istanbul_new.png?raw=true "Displays test coverage")


####Testing
* Mocha
```$ grunt test ```
![Mocha test](/images/mocha_test.png?raw=true "Displays mocha test results")
Displays mocha test results


## How the Chat looks
![Chat startpage](/images/startpage.png?raw=true "Chat startpage")
Chat startpage

![User check](/images/error_on_already_existing_user.png?raw=true "Application checks if user already exists")
Application checks if user already exists

![User list](/images/userlist.png?raw=true "Sidebar menu displays current user list with room information")
Sidebar menu displays current user list with room information

![Room list](/images/roomlist.png?raw=true "Sidebar menu displays current room list and a new room can be created")
Sidebar menu displays current room list and a new room can be created
