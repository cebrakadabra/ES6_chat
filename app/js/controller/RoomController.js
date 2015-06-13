// ES6 RoomController
class RoomController{

  constructor($scope, UserService, $timeout, $location){

    $scope.navigate = function(param, userdata){
      console.log(userdata);
      if(param){
        $location.path("/chat");
      } else{
        alert("User can't be set - please try again");
      }
    };

    // User callback, checks on existance of current user
    $scope.selectRoom = function(room){
      $scope.newUser.room = room;
      UserService.delete({name: $scope.newUser.name});
      UserService.create({name: $scope.newUser.name, inRoom: room}, $scope.navigate);
    };

    $scope.checkUser = function(param, userdata){
      if(param){
        console.log("User fine");
        $scope.newUser.name = userdata.name;
        $(".rooms").fadeIn();

      } else{
        console.log("User already exists");
        $(".rooms").fadeOut();
        $(".usererror").fadeIn();
        $timeout(function(){
          $(".usererror").fadeOut();
        }, 2500);
      }
    };

    $scope.setUser = function(username){
      UserService.create({name: username}, $scope.checkUser);
    };
  }



}

export { RoomController };
