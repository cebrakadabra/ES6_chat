class UserService{
  constructor($http){
    this.data_array = [];
    this.$http = $http;
  }
  //GET Request
  // Call to get all Users via the Mongoose API
  get(callback){
    this.$http({
      method: 'GET',
      url: '/api/user'
    })
    .success(function(data, status, headers, config) {
      let users = data;

      for(let i = 0; i < users.length; i++){
        this.data_array.push(users[i]);
      }
    })
    .error(function(data, status, headers, config) {
      console.log("error");
      console.log(status);
    });

    return this.data_array;
  }
  // POST Request
  // Call to insert a new User into the database via Mongoose API
  create(userData, callback){
    this.$http({
      method: 'POST',
      url: '/api/user',
      data: userData
      })
    .success(function(data, status, headers, config) {
      console.log(status);
      // bool.value = true;
      callback(true, userData.name);
    })
    .error(function(data, status, headers, config) {
      console.log(status);
      // bool.value = false;
      callback(false, null);
    });
  }
  //DELETE Request
  // Call to delete a single User in the database via Mongoose API
  delete(name){
    return this.$http.delete('/api/user/' + name);
  }


}

export { UserService };
