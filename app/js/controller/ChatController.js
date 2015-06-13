// ES6 ChatController
class ChatController{
  constructor($scope, UserService, RoomService){

    $scope.socket = io.connect('http://localhost:1337');

    // on connection to server, ask for user's name with an anonymous callback
    $scope.socket.on('connect', function(){

      /* PRODUCTION USAGE */
      $scope.socket.emit('adduser', $scope.newUser.name, $scope.newUser.room);

      /* DEV USAGE
      only for DEV -- user will be retrieved from window before then (Rooms, as well as romm itself) */

      /* let date = new Date();
      let name = "Steve "+date;
      $scope.$apply(function(){
      $scope.newUser.name = name;
      });
      $scope.socket.emit('adduser', name, "Salzburg"); */


    });

    // listener, whenever the server emits 'updatechat', this updates the chat body
    $scope.socket.on('updatechat', function (username, data) {
      let currentdate = new Date();
      let datetime = "Last Sync: " + currentdate.getDate() + "/" +
                    (currentdate.getMonth()+1)  + "/" +
                    currentdate.getFullYear() + " @ " +
                    currentdate.getHours() + ":" +
                    currentdate.getMinutes() + ":" +
                    currentdate.getSeconds();

      if(username === $scope.newUser.name){
        $("#conversation").append("<div class='chatright'><span class='rightext'>You wrote - <small>"+datetime+"</small></span><br><div class='bubble bubbleright'>"+data+"</div></div>");
      } else if(username === "SERVER"){
        $("#conversation").append("<div class='middle'><div class='middlebubble'>"+username+": "+data+"</div></div>");
      } else{
        $("#conversation").append("<div class='chatleft'>"+username+" wrote - <small>"+datetime+"</small><br><div class='bubble bubbleleft'>"+data+"</div></div>");
      }

      let objDiv = document.getElementById("conversation");
      objDiv.scrollTop = objDiv.scrollHeight;
    });






    // listener, whenever the server emits 'updateusers', this updates the username list
    $scope.socket.on('updateusers', function(data) {
      $scope.users = [];
      $.each(data, function(key, value) {
        $scope.$apply(function(){
          $scope.users.push({name: key, room: value});
        });
      });
    });





    // listener, whenever the server emits 'updaterooms', this updates the room the client is in
    $scope.socket.on('updaterooms', function(rooms, current_room) {
      $scope.roomlist = [];
      $.each(rooms, function(key, value) {
        if(value == current_room){
          $scope.$apply(function(){
            $scope.currentroom = null;
            $scope.currentroom = value;
          });
        }
        else {
          $scope.$apply(function(){
            $scope.roomlist.push(value);
          });
        }
      });
    });

    // listener, if a user switches the room, the view should be updated
    $scope.socket.on('updateuserifRoomSwitched', function(user, room){

      let index;
      for(let i = 0; i < $scope.users.length; i++){
        if(user === $scope.users[i].name){
          index = i;
        }
      }
      $scope.$apply(function(){
        $scope.users[index].room = room;
      });
    });

    // displaying the username on topright
    $scope.socket.on('displayUsername', function(username){
      $scope.$apply(function(){
        $scope.username = username;
      });
    });


    // function for switching a room. Every a tag (in line 99) of a room has a onclick attribute
    // this one is called here
    $scope.switchRoom = function(room){
      $scope.socket.emit('switchRoom', room);
    };

    // function for sending a messge in the chat
    $scope.sendMessage = function(message){
      if(message !== undefined && message !== ''){
        $("#data").val('');
        $scope.message = '';
        $scope.socket.emit('sendchat', message);
      }
    };


    // function for creating a new room
    $scope.createNewRoom = function(newroom){
      if(newroom !== undefined && newroom !== ''){
        $scope.socket.emit('createRoom', newroom);
        RoomService.createRoom({name: newroom});
        $("#newroominput").val('');
        $scope.newroom = '';
      }
    };

    // mouseover function for displaying users
    $scope.displayUsers = function(){
      $(".roomfield").css("display", "none");
      $(".userfield").css("display", "block");
    };

    // mouseover functions for displaying rooms
    $scope.displayRooms = function(){
      $(".userfield").css("display", "none");
      $(".roomfield").css("display", "block");
    };

    // mouseleave function for displaying users
    $scope.removeUserDisplay = function(){
      $(".userfield").css("display", "none");
    };

    // mouseleave function for displaying rooms
    $scope.removeRoomDisplay = function(){
      $(".roomfield").css("display", "none");
    };

  }
}

export { ChatController };
