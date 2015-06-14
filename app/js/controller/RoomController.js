// ES6 RoomController
class RoomController{

  constructor($scope, UserService, $timeout, $location){

    // callback function for chat navigation on successful user creation (with room)
    $scope.navigate = function(param, userdata){
      console.log(userdata);
      if(param){
        $location.path("/chat");
      } else{
        alert("User can't be set - please try again or restart server");
      }
    };

    // select Room for current user and update user in database
    $scope.selectRoom = function(room){
      $scope.newUser.room = room;
      UserService.delete({name: $scope.newUser.name});
      UserService.create({name: $scope.newUser.name, inRoom: room}, $scope.navigate);
    };

    // User callback, checks on existance of current user
    $scope.checkUser = function(param, userdata){
      if(param){
        /* User is fine */
        $scope.newUser.name = userdata.name;
        $(".rooms").fadeIn();

      } else{
        /* User already exists */
        $(".rooms").fadeOut();
        $(".usererror").fadeIn();
        $timeout(function(){
          $(".usererror").fadeOut();
        }, 2500);
      }
    };

    // initial set User call with callback on checkUser
    $scope.setUser = function(username){
      UserService.create({name: username, inRoom: null}, $scope.checkUser);
    };
  }



}

export { RoomController };
