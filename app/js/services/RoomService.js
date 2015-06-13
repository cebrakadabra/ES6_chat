class RoomService{
  constructor($http){
    this.$http = $http;
  }
  // GET Request
  // Call to get all Rooms via the Mongoose API
  getRooms(){
    return this.$http.get('/api/room');
  }
  // POST Request
  // Call to insert a new Room into the database via Mongoose API
  createRoom(roomName){
    return this.$http.post('/api/room', roomName);
  }
  // DELETE Request
  // Call to delete a single Room in the database via Mongoose API
  delete(id){
    return this.$http.delete('/api/room/' + id);
  }
}

export { RoomService };
