angular.module('srmt').service("reporteeLeaveRequestService",function($http,HRM_CONFIG){
	
	this.SearchLeaveReporteeLeaveRequest = function(superiorId,dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_LEAVEREQUEST_BY_REPORTEES(superiorId,dataUrl));
	};
	
	this.SearchLeaveReporteeLeaveRequestCount = function(superiorId,dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_LEAVEREQUEST_BY_REPORTEES_COUNT(superiorId,dataUrl));
	};
})