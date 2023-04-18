angular.module('srmt').service('employeeAttendanceService', function($http, HRM_CONFIG,HRM_UPLOAD_CONFIG) {

	this.getAttendanceByEmpId = function(id,page,size){
		return $http.get(HRM_CONFIG.URL.GET_ATTENDANCE_LIST_BY_EMP_ID(id,page,size));
	};
	
	this.getCount= function(id,dataUrl){
		return $http.get(HRM_CONFIG.URL.MONTLY_ATTENDANCE_SEARCH_COUNT(id,dataUrl));
	};
	
	this.searchMonthlyAttendance = function(id,dataUrl){
		return $http.get(HRM_CONFIG.URL.MONTLY_ATTENDANCE_SEARCH(id,dataUrl));
	}
});