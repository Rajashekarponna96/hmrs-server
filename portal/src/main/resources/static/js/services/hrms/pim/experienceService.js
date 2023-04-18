angular.module('srmt').service("pimExperienceService", function($http, HRM_CONFIG) {
	
	this.getExperiences=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_EXPERIENCE_LIST(page,size));
	};
	
	this.addExperience = function(empid,experience){
		return $http.post(HRM_CONFIG.URL.ADD_EXPERIENCE(empid),experience)
	};
	
	this.getAllExperience = function(empid){
		return $http.get(HRM_CONFIG.URL.GET_EXPERIENCE_LIST(empid));
	};
	
	this.updateExperience = function(empid, expid, experience){
		return $http.put(HRM_CONFIG.URL.UPDATE_EXPERIENCE(empid,expid),experience);
	};
	
	this.deleteExperience = function(empid, expid){
		return $http.delete(HRM_CONFIG.URL.DELETE_EXPERIENCE(empid,expid));
	};
})