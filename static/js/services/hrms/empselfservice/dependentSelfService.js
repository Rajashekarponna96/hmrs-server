angular.module('srmt').service('dependentSelfService', function($http, HRM_CONFIG,HRM_UPLOAD_CONFIG) {

	this.getEmployee = function(){
		return $http.get("http://localhost:19000/employee/28/dependents");
	}
});
