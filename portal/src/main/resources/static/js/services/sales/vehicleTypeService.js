angular.module('srmt').service("vehicleTypeService",function($http,SALES_CONFIG){
	
	this.getAllVehicleTypes=function(){
		return $http.get(SALES_CONFIG.URL.GET_ALL_VEHICLETYPES());
	};
	
	this.addVehicleType = function(vehicleType){
		return $http.post(SALES_CONFIG.URL.ADD_VEHICLE_TYPE(),vehicleType);
	};
	
})