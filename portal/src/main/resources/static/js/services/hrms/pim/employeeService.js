angular.module('srmt').service("employeeService", function($http, HRM_CONFIG) {
	this.getAllReporties = function(id) {
		return $http.get(HRM_CONFIG.URL.GET_REPORTIES(id));
	};
	
	this.getAllActiveEmployees = function() {
		return $http.get(HRM_CONFIG.URL.GET_ALL_ACTIVE_EMPLOYEES());
	};
	this.getAllActiveEmployeesAndExceptById = function(id) {
		return $http.get(HRM_CONFIG.URL.GET_ALL_EMPLOYEES_EXCEPT_BY_ID(id));
	};
	
	this.getSuperior=function(id){
		return $http.get(HRM_CONFIG.URL.GET_SUPERIOR(id))
	}
	this.getAllSalesManagers=function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_SALES_MANAGERS())
	}
	this.getAllSalesRepresentatives=function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_SALES_REPRESENTATIVES())
	}
	
	this.searchEmployee=function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_EMPLOYEE(dataUrl))
	}
	this.getCount=function(countUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_EMPLOYEE_COUNT(countUrl))
	}
	this.getLocationsAndVehicleModelsById=function(employeeId){
		return $http.get(HRM_CONFIG.URL.GET_VEHICLE_MODELS_AND_LOCATIONS_BY_EMP_ID(employeeId))
	}
	
	this.getAllActiveAndNotNullUsers=function(){
		return $http.get(HRM_CONFIG.URL.GET_ACTIVE_AND_NOT_NULL_USERS());
	}
});