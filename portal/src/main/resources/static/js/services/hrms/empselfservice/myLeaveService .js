angular.module('srmt').service('myLeaveService', function($http, HRM_CONFIG) {

	this.getMyLeavesByCalendarId = function(empId, calendarId, page, size){
		return $http.get(HRM_CONFIG.URL.GET_MY_LEAVES_BY_CALENDAR_ID(empId, calendarId, page, size));
	}
});
