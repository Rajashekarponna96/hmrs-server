angular.module('srmt').service("onlineInventoryService",function($http,HRM_CONFIG){
	
	this.getLocationsAndVehicleModelsByEmployeeId=function(employeeId){
		return $http.get(HRM_CONFIG.URL.GET_LOCATIONS_VEHICLE_MODELS_BY_EMP_ID(employeeId))
	}
	
})