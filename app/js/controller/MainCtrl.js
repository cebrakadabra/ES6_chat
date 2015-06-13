// ES6 MainCtrl
class MainCtrl {
  constructor($scope, UserService, RoomService){
    /* If we need to load users from database
    this.users = UserService.get(); */

    // Use Roomservice to call the api that calls mongoose that calls mongodb
    $scope.rooms = [];

    /* Old test usage for es5 service module
    RoomService.getRooms();
    $scope.rooms = RoomService.roomdata; */

    // Load Rooms via the Mongoose API
    RoomService.getRooms().success(function(data, status, headers, config) {
      let rooms = {
        data: data
      };
      let roomdata = [];
      for(let i = 0; i < rooms.data.length; i++){
        $scope.rooms.push(rooms.data[i].name);
      }
    })
    .error(function(data, status, headers, config) {
      console.log("error");
      console.log(status);
    });

    // new actual user object
    $scope.newUser = {
      name: null,
      room: null
    };

    $scope.users = [];
    $scope.currentroom = null;
    $scope.roomlist = [];

    $scope.username = null;
    $scope.actualroom = null;
  }
}
export { MainCtrl };
