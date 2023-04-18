angular.module('srmt').service("functionHallService",function($http,CRM_CONFIG){
	this.addFunctionHall=function(functionHall){
		return $http.post(CRM_CONFIG.URL.ADD_FUNCTION_HALL(),functionHall);
	};
	
	this.getFunctionHallsList = function(page,size){
		return $http.get(CRM_CONFIG.URL.GET_FUNCTION_HALLS(page,size));
	};
	this.updateFunctionHall = function(id,functionHall){
		return $http.put(CRM_CONFIG.URL.UPDATE_FUNCTION_HALL(id),functionHall);
	};
	
	this.getAllFunctionHalls = function(){
		return $http.get(CRM_CONFIG.URL.GET_ALL_FUNCTION_HALLS());
	};
	
})
