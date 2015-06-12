class MainCtrl {
  constructor($scope, UserService, RoomService){
    console.log("test es6");

    // If we need to load users from database
    // this.users = UserService.get();

    // Use Roomservice to call the api that calls mongoose that calls mongodb ;)
  		$scope.roomservice = RoomService;
      $scope.roomservice.getRooms();
      $scope.rooms = $scope.roomservice.roomdata;

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
