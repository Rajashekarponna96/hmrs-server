
angular.module('srmt').service("terminateService",function($http,HRM_CONFIG){
	this.addTerminateEmployee = function(id,person){
		console.log('id is:'+id);
		return $http.post(HRM_CONFIG.URL.ADD_TERMINATION(id),person);
	};
		
});