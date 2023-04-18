angular.module('srmt').service('leaveRequestService', function($http, HRM_CONFIG,HRM_UPLOAD_CONFIG) {

	this.getLeaveRequestList=function(id){
		return $http.get(HRM_CONFIG.URL.GET_LEAVE_REQUEST_LIST_BY_EMP_ID(id))
	};
	
	
	this.applyForLeave=function(id,leaveRequset){
		return $http.post(HRM_CONFIG.URL.APPLY_FOR_LEAVE(id),leaveRequset);
	};
	
	this.getLeaveEntitleList=function(id){
		return $http.get(HRM_CONFIG.URL.GET_ALL_LEAVE_ENTITLEMENTS(id))
	};
	
	this.getAllLeaveRequests=function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_LEAVEREQUESTS())
	};
	
	this.updateLeaveRequest = function(leaveRequset){
		return $http.put(HRM_CONFIG.URL.APPROVE_LEAVE_REQUEST(leaveRequset.id),leaveRequset);
	};
	
	this.searchByEmployeeId = function(url){
		return $http.get(HRM_CONFIG.URL.SEARCH_EMP_LEAVE_REQUEST_BY_EMP_ID(url));
	}
	
	this.cancelLeaveRequest = function(id){
		return $http.put(HRM_CONFIG.URL.CANCEL_LEAVE_REQUEST(id));
	};
	
	this.getCount = function(dataurl){
		return $http.get(HRM_CONFIG.URL.GET_COUNT_EMPLOYEE_LEAVE_REQUESTS_SEARCH(dataurl));
	};
	
	this.getAllLeaveRequestsByPageAndSize=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_EMPLOYEE_LEAVE_REQUEST_PAGE_AND_SIZE(page,size))
	};
	
});