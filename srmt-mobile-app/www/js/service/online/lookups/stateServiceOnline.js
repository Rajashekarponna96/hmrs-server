angular.module('srmt').service("onlineStateService",function($http, HRM_CONFIG){
	
	this.getStates=function(countryId){
		return $http.get(HRM_CONFIG.URL.GET_STATES_BY_COUNTRY_ID(countryId))
	}	
})