class RoomController{

  constructor($scope, UserService, $timeout, $location){

    // User callback, checks on existance of current user
    $scope.selectRoom = function(room){
      $scope.newUser.room = room;
      $location.path("/chat");
    };

    $scope.checkUser = function(param, username){
      if(param){
        console.log("User fine");
        $scope.newUser.name = username;
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
