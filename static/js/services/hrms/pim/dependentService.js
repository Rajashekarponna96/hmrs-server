angular.module('srmt').service("dependentService",function($http,HRM_CONFIG){
	
	
	this.addDependent=function(id,dependent){
		return $http.post(HRM_CONFIG.URL.ADD_DEPENDENT(id),dependent)
	}
	
	this.getDependentList=function(id,dependent){
		return $http.get(HRM_CONFIG.URL.GET_DEPENDENT_LIST(id));
	}
	
	this.updateDependent=function(id,dependentId,dependent){
		return $http.put(HRM_CONFIG.URL.UPDATE_DEPENDENT(id,dependentId),dependent)
	}
	
	this.deleteDependent=function(id,dependentId){
		return $http.delete(HRM_CONFIG.URL.DELETE_DEPENDENT(id,dependentId))
	}
})