angular.module('srmt').service("holidayService",function($http,HRM_CONFIG){
	console.log("in service");
	this.getHolidaysList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_HOLIDAYS_LIST(page,size));
	};
	this.addHoliday = function(id,calenderYearId,holidays){
		return $http.post(HRM_CONFIG.URL.ADD_HOLIDAY(id,calenderYearId),holidays);
	};
	this.deleteHoliday = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_HOLIDAY(id));
	};
	this.updateHoliday = function(id,calenderYearId,holidayId,holiday){
		return $http.put(HRM_CONFIG.URL.UPDATE_HOLIDAY(id,calenderYearId,holidayId),holiday);
	};
	
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_HOLIDAYS_COUNT());
	};
	
	this.searchByLeavePeriodIdAndStateId=function(url){
		return $http.get(HRM_CONFIG.URL.SEARCH_BY_LEAVEPERIODID_AND_STATE(url));
	};
	this.searchByLeavePeriodIdAndStateIdCount=function(url){
		return $http.get(HRM_CONFIG.URL.SEARCH_BY_LEAVEPERIODID_AND_STATE_COUNT(url));
	};
	
	
	
	
});