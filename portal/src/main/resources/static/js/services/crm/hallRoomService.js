angular.module('srmt').service("hallRoomService",function($http,CRM_CONFIG){
	this.addHallRoom=function(hallRoom){
		return $http.post(CRM_CONFIG.URL.ADD_HALL_ROOM(),hallRoom);
	};
	
	this.getHallRoomList = function(page,size){
		return $http.get(CRM_CONFIG.URL.GET_HALL_ROOM_LIST(page,size));
	};
	this.updateHallRoom = function(id,hallRoom){
		return $http.put(CRM_CONFIG.URL.UPDATE_HALL_ROOM(id),hallRoom);
	};
	
	this.getCount = function(){
		return $http.get(CRM_CONFIG.URL.GET_HALLROOM_COUNT());
	};
	this.deleteHallRoom = function(id){
		return $http.delete(CRM_CONFIG.URL.DELETE_HALL_ROOM(id));
	};
	
})