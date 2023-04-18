angular.module('srmt').service("workShiftService",function($http,HRM_CONFIG){
	
	
	this.addWorkShift = function(WorkShift){
		return $http.post(HRM_CONFIG.URL.ADD_WORKSHIFT(),WorkShift);
	};
	
	this.updateWorkShift = function(WorkShift){
		return $http.put(HRM_CONFIG.URL.UPDATE_WORKSHIFT(WorkShift.id),WorkShift);
	};
	
	this.getWorkShiftsList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_WORKSHIFT_LIST(page,size));
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_WORKSHIFT_COUNT());
	};
	this.deleteWorkShift = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_WORKSHIFT(id));
	};
	
})