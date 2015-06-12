class UserService{
  constructor($http){
    this.$http = $http;
  }
  get(){
    console.log("get called");
  }
}

export { UserService };
