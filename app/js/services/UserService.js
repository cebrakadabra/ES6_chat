class UserService{
  constructor($http){
    this.$http = $http;
  }
  //GET Request
  // Call to get all Users via the Mongoose API
  get(){
    return this.$http,get('/api/user');
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
      callback(true, userData);
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
