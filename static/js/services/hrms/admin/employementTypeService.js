angular.module('srmt').service("employmentTypeService",function($http,HRM_CONFIG){
	this.getEmploymentTypeList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_EMPLOYMENT_TYPE_LIST(page,size));
	};
	this.addEmploymentType = function(employmentType){
		return $http.post(HRM_CONFIG.URL.ADD_EMPLOYMENT_TYPE(),employmentType);
	};
	this.updateEmploymentType = function(employmentType){
		return $http.put(HRM_CONFIG.URL.UPDATE_EMPLOYMENT_TYPE(employmentType.id),employmentType);
	};
	this.deleteEmploymentType = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_EMPLOYMENT_TYPE(id));
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_EMPLOYMENT_COUNT());
	};
	this.getAllEmploymentTypes = function(){
		return $http.get(HRM_CONFIG.URL.GET_EMPLOYMENT_TYPES());
	};
});