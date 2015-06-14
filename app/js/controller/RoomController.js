// ES6 RoomController
class RoomController{

  constructor($scope, UserService, $timeout, $location){

    // callback function for chat navigation on successful user creation (with room)
    $scope.navigate = function(param, userdata){
      if(param){
        $location.path("/chat");
      } else{
        alert("User can't be set - please try again or restart server");
      }
    };

    // select Room for current user and update user in database
    $scope.selectRoom = function(room){
      $scope.newUser.room = room;
      let user = $scope.newUser.name;
      UserService.create({name: user, inRoom: room}, $scope.navigate);
    };

    // initial set User call with callback on checkUser
    $scope.setUser = function(username){
      UserService.get().success(function(data, status, headers, config) {

        if(data[0] === undefined){
          $scope.newUser.name = username;
          $(".rooms").fadeIn();
          $timeout(function(){
            $(".usererror").fadeOut();
          }, 2500);
        } else{

          let users = {
            data: data
          };
          let cnt = 0;
          for(let user of users.data){
            if(user.name != username){
              cnt++;
            }
          }
          console.log(cnt);
          console.log(users.data.length);
          if(cnt === users.data.length){
            $scope.newUser.name = username;
            $(".rooms").fadeIn();
          } else{
            /* User already exists */
            $(".rooms").fadeOut();
            $(".usererror").fadeIn();
          }
          $timeout(function(){
            $(".usererror").fadeOut();
          }, 2500);
        }
      })
      .error(function(data, status, headers, config) {
        console.log("Error retrieving users");
        console.log(status);
      });
    };
  }



}

export { RoomController };
