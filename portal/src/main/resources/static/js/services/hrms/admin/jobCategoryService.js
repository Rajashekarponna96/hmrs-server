angular.module('srmt').service("jobCategoryService",function($http,HRM_CONFIG){
	console.log("in service");
	this.getJobCategoryList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_JOB_CATEGORY_LIST(page,size));
	};
	this.addJobCategory = function(jobCategory){
		return $http.post(HRM_CONFIG.URL.ADD_JOB_CATEGORY(),jobCategory);
	};
	this.deleteJobCategory = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_JOB_CATEGORY(id));
	};
	this.editJobCategory = function(jobCategory){
		return $http.put(HRM_CONFIG.URL.EDIT_JOB_CATEGORY(jobCategory.id),jobCategory);
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.JOB_CATEGORY_COUNT());
	};
	
	
});