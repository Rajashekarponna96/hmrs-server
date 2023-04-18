angular.module('srmt').service("stateService",function($http,HRM_CONFIG){
	
	
	this.getStates=function(id){
		return $http.get(HRM_CONFIG.URL.GET_ALL_STATES(id))
	}
	
	this.addState=function(id,state){
		return $http.post(HRM_CONFIG.URL.ADD_STATE(id),state)
	}
	
	this.updateState=function(countryId,stateId,state){
		return $http.put(HRM_CONFIG.URL.UPDATE_STATE(countryId,stateId),state)
	}
	
	this.searchStates=function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_STATES(dataUrl))
	}
	this.getCount=function(CountUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_STATES_COUNT(CountUrl))
	}
	
	
})