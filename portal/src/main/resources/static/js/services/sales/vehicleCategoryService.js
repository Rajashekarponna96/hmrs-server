angular.module('srmt').service("vehicleCategoryService",function($http,SALES_CONFIG){
	
	this.getVehicleCategories=function(){
		return $http.get(SALES_CONFIG.URL.GET_VEHICLE_CATEGORIES());
	};
	
	this.addVehicleCategory = function(vehicleCategory){
		return $http.post(SALES_CONFIG.URL.ADD_VEHICLE_CATEGORY(),vehicleCategory);
	};
	
	this.updateVehicleCategory = function(vehicleCategoryId, vehicleCategory){
		return $http.put(SALES_CONFIG.URL.UPDATE_VEHICLE_CATEGORY(vehicleCategoryId),vehicleCategory);		
	}
	
	this.getVehicleModelsByCategory=function(id){
		return $http.get(SALES_CONFIG.URL.GET_VEHICLE_MODELS_FROM_VEHICLE_CATEGORY(id));
	};
})