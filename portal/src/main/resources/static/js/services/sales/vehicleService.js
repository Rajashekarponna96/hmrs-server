angular.module('srmt').service("vehicleService",function($http,SALES_CONFIG){
	
	this.getAllVehicleTypes=function(){
		return $http.get(SALES_CONFIG.URL.GET_ALL_VEHICLETYPES());
	};
	
	this.addVehicle = function(vehicle){
		return $http.post(SALES_CONFIG.URL.ADD_VEHICLE(),vehicle);
	};
	
	this.getVehicleModelList = function(page, size){
		return $http.get(SALES_CONFIG.URL.GET_VEHICLE_LIST(page, size));
	};
	
	this.getCount = function(dataUrl){
		return $http.get(SALES_CONFIG.URL.SEARCH_VEHICLE_COUNT(dataUrl));
	};
	
	this.getVehicleCategories = function(){
		return $http.get(SALES_CONFIG.URL.GET_VEHICLE_CATEGORIES());
	};
	
	this.updateVehicleModel = function(vehicleModelId,vehicleModel){
		return $http.put(SALES_CONFIG.URL.UPDATE_VEHICLE_MODEL(vehicleModelId),vehicleModel);
	}
	
	this.SearchVehicle=function(dataUrl){
		return $http.get(SALES_CONFIG.URL.SEARCH_VEHICLE_MODEL(dataUrl));
	};
	
	this.getVehicleModelList = function(page,size){
		return $http.get(SALES_CONFIG.URL.GET_VEHICLE_MODELS(page,size));
	};
	
	this.getCount = function(countUrl){
		return $http.get(SALES_CONFIG.URL.SEARCH_VEHICLE_COUNT(countUrl));
	}
})