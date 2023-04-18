angular.module('srmt').service("designationService", function(HRM_CONFIG, $http) {
	
	this.addDesignation=function(designation){
		return $http.post(HRM_CONFIG.URL.ADD_DESIGNATION(),designation);
	}
	this.getDesignationList=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_DESIGNATION_LIST(page,size));
	}
	this.updateDesignation=function(id,designation){
		return $http.put(HRM_CONFIG.URL.UPDATE_DESIGNATION(id),designation);
	}
	this.deletedesignation=function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_DESIGNATION(id));
	}
	this.getCount=function(){
		return $http.get(HRM_CONFIG.URL.GET_DESIGNATION_COUNT());
	}
	this.getDesignations=function(){
		return $http.get(HRM_CONFIG.URL.GET_DESIGNATIONS());
	}
})