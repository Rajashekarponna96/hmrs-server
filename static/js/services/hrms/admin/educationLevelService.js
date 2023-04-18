angular.module('srmt').service("educationLevelService",function($http,HRM_CONFIG){
	this.getAllEducationLevelDetails = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_EDUCATION_LEVEL_LIST(page,size));
	};
	this.addEducationLevel = function(educationLevel){
		return $http.post(HRM_CONFIG.URL.ADD_EDUCATION_LEVEL(),educationLevel);
	};
	this.updateEducationLevel = function(educationLevel){
		return $http.put(HRM_CONFIG.URL.UPDATE_EDUCATION_LEVEL(educationLevel.id),educationLevel);
	};
	this.deleteEducationLevel = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_EDUCATION_LEVEL(id));
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_EDUCATION_LEVEL_COUNT());
	};
});