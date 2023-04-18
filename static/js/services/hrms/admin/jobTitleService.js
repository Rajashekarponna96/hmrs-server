angular.module('srmt').service("jobTitleService",function($http,HRM_CONFIG){
	
	this.addJobTitles = function(jobTitle){
		return $http.post(HRM_CONFIG.URL.ADD_JOB_TITLE(),jobTitle);
	};
	
	this.updateJobTitle = function(jobTitle){
		return $http.put(HRM_CONFIG.URL.UPDATE_JOB_TITLE(jobTitle.id),jobTitle);
	};
	
	this.getJobTitlesList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_JOB_TITLES_LIST(page,size));
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_JOB_TITLES_COUNT());
	};
	this.thisdeleteJobTitle = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_JOB_TITLE(id));
	}
	
});