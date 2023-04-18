
angular.module('srmt').service("reportingService",function($http,HRM_CONFIG){
	this.addReportingTo=function(id,person){
		return $http.post(HRM_CONFIG.URL.ADD_REPORTING_TO(id),person);
	};
		
	this.getPerson = function(id){
		return $http.get(HRM_CONFIG.URL.FIND_PERSON_BY_ID(id));
	}
});