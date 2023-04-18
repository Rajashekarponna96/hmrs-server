angular.module('srmt').service("dashboard_functionHallService",function($http,CRM_CONFIG){
	
	this.getEventsByDate = function(date){
		return $http.get(CRM_CONFIG.URL.GET_FUNCTION_HALL_EVENTS_BY_DATE(date));
	};
	
	this.getEventsMonthly = function(date){
		return $http.get(CRM_CONFIG.URL.GET_FUNCTION_HALL_EVENTS_BY_MONTH(date));
	};
});