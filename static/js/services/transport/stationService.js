angular.module('srmt').service("stationService",function($http,TPT_CONFIG){
	
	
	this.getStations=function(id){
		return $http.get(TPT_CONFIG.URL.GET_ALL_STATIONS(id))
	}
	
	this.addStation=function(id,station){
		return $http.post(TPT_CONFIG.URL.ADD_STATION(id),station)
	}
	
	this.updateStation=function(controlId,stationId,station){
		return $http.put(TPT_CONFIG.URL.UPDATE_STATION(controlId,stationId),station)
	}
	
	this.searchStations=function(dataUrl){
		return $http.get(TPT_CONFIG.URL.SEARCH_STATIONS(dataUrl))
	}
	this.getCount=function(CountUrl){
		return $http.get(TPT_CONFIG.URL.SEARCH_STATION_COUNT(CountUrl))
	}
	
	
})