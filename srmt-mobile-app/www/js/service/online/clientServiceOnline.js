angular.module('srmt').service("clientServiceOnline", function($http, HRM_CONFIG, CRM_CONFIG) {

	this.addCustomer = function(customer) {
		return $http.post(CRM_CONFIG.URL.ADD_CLIENT(), customer);
	};
	
	this.getEmployeeById = function(empId){
		return $http.get(HRM_CONFIG.URL.FIND_EMPLOYEE_BY_ID(empId));
	};

	this.getCustomerList = function(page, size){
		return $http.get(CRM_CONFIG.URL.GET_SALES_CUSTOMER_LIST(page, size));
	};
	
	this.getCustomersCount = function(){
		return $http.get(CRM_CONFIG.URL.GET_CUSTOMERS_COUNT());
	};
	
	this.getAppointments = function(empId){
		return $http.get(CRM_CONFIG.URL.GET_APPOINTMENTS(empId));
	};
	
	this.getLocationsAndVehicleModelsById = function(salesRepId){
		return $http.get(HRM_CONFIG.URL.GET_LOCATIONS_VEHICLE_MODELS_BY_EMP_ID(salesRepId));
	};
	
	this.getCustomerList = function(salesRepId, page, size){
		return $http.get(CRM_CONFIG.URL.GET_SALES_CUSTOMER_LIST_BY_SALES_REP_ID(salesRepId, page, size));
	};
})