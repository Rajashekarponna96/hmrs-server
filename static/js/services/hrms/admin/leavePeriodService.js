angular.module('srmt').service("leavePeriodService",function($http,HRM_CONFIG){
	
	this.addLeavePeriod = function(leavePeriod){
		return $http.post(HRM_CONFIG.URL.ADD_LEAVE_PERIOD(),leavePeriod);
	};
	
	this.updateLeavePeriod = function(leavePeriod){
		return $http.put(HRM_CONFIG.URL.UPDATE_LEAVE_PERIOD(leavePeriod.id),leavePeriod);
	};
	
	this.getLeavePeriodsList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LEAVE_PERIOD_LIST(page,size));
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_LEAVE_PERIODS_COUNT());
	};
	this.deleteLeavePeriod = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_LEAVE_PERIOD_TITLE(id));
	};
	
	this.getAllLeavePeriodsList = function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_LEAVE_PERIOD_LIST());
	};
	
});