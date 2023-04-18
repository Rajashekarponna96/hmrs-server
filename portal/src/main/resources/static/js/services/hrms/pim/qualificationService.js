angular.module('srmt').service("pimQualificationService", function($http, HRM_CONFIG) {
	
	this.getQualificationList=function(id){
		return $http.get(HRM_CONFIG.URL.GET_QUALIFICATION_LIST(id));
	};
	
	this.addQualification = function(id,qualification){
		return $http.post(HRM_CONFIG.URL.ADD_QUALIFICATION(id),qualification)
	};
	
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_QUALIFICATION_COUNT());
	};
	
	this.updateQualification= function(empid, qualid, qualification){
		return $http.put(HRM_CONFIG.URL.UPDATE_QUALIFICATION(empid,qualid),qualification);
	};
	
	this.deleteQualification = function(empid, qualid){
		return $http.delete(HRM_CONFIG.URL.DELETE_QUALIFICATION(empid,qualid));
	};
	
})