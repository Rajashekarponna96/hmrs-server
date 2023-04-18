angular.module('srmt').service("LocationService",function($http,HRM_CONFIG){
	
	this.addLocation=function(location){
		return $http.post(HRM_CONFIG.URL.ADD_LOCATION(),location);
	}
	
	this.updateLocation=function(id,location){
		return $http.put(HRM_CONFIG.URL.UPDATE_LOCATION(id),location);
	}
	
	this.deleteLocation=function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_LOCATION(id));
	}
	
	this.getAlltLocations=function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_LOCATIONS());
	}
	
});