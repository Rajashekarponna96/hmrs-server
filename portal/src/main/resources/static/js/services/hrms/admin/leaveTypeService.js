angular.module('srmt').service("leaveTypeService",function($http,HRM_CONFIG){
	
	this.addLeaveType = function(leaveType){
		return $http.post(HRM_CONFIG.URL.ADD_LEAVE_TYPE(),leaveType);
	};
	
	this.updateLeaveType = function(leaveType){
		return $http.put(HRM_CONFIG.URL.UPDATE_LEAVE_TYPE(leaveType.id),leaveType);
	};
	
	this.getLeaveTypesList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LEAVE_TYPE_LIST(page,size));
	};
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_LEAVE_TYPES_COUNT());
	};
	this.deleteLeaveType = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_LEAVE_TYPE_TITLE(id));
	};
	
	this.getAllLeaveTypes = function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_LEAVE_TYPES());
	}
	
});