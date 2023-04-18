angular.module('srmt').service("personalService", function($http, HRM_CONFIG) {
	var employee;
	this.addPersonalDetail = function(person) {
		return $http.post(HRM_CONFIG.URL.ADD_PERSONAL_DETAIL(), person)
	};
	this.setEmployeee = function(employee) {
		this.employee = employee;
		console.log(this.employee);
	};
	
	this.findPersonById=function(id){
		return $http.get(HRM_CONFIG.URL.FIND_PERSON_BY_ID(id))
	}
	this.getEmployee = function() {
		console.log(this.employee);
		return this.employee;
	};
	
	this.getEmployeeList=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_EMPLOYEE_LIST(page,size))
	}
	
	this.getCount=function(){
		return $http.get(HRM_CONFIG.URL.GET_EMPLOYEE_COUNT())
	}
	this.updatePerson=function(id,person){
		return $http.put(HRM_CONFIG.URL.UPDATE_PERSON(id),person)
	}
	this.getEmployeeById=function(id){
		return $http.get(HRM_CONFIG.URL.FIND_EMPLOYEE_BY_ID(id))
	}
	this.addReportingTo=function(id,person){
		return $http.post(HRM_CONFIG.URL.ADD_REPORTING_TO(id),person)
	}
	this.setStatus=function(id){
		return $http.get(HRM_CONFIG.URL.SET_STATUS(id))
	};
	
	this.getAllActiveEmployees = function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_ACTIVE_EMPLOYEES());
	};
	
	this.updatePersonForSalesRepLocations = function(empId, emp){
		return $http.put(HRM_CONFIG.URL.UPDATE_PERSON_FOR_SALES_REPRESENTATIVE(empId),emp);
	}
})
