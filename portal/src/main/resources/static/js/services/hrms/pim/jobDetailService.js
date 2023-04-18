angular.module('srmt').service("jobDetailService",function($http,HRM_CONFIG){
	this.addJobDetail=function(id,jobDetails){
		return $http.post(HRM_CONFIG.URL.ADD_JOB_DETAILS(id),jobDetails)
	}
})