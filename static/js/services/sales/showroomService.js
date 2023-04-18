angular.module('srmt').service("showroomService",function($http,SALES_CONFIG){
	
	this.getShowroomList=function(page,size){
		return $http.get(SALES_CONFIG.URL.GET_SHOWROOM_LIST(page,size));
	};
	
	this.addShowroom = function(showroom){
		return $http.post(SALES_CONFIG.URL.ADD_SHOWROOM(),showroom);
	};
	
	this.updateShowroom = function(showroomId,showroom){
		return $http.put(SALES_CONFIG.URL.UPDATE_SHOWROOM(showroomId),showroom);
	};
	
	this.searchShowroomsByCodeAndLocation = function(dataUrl){
		return $http.get(SALES_CONFIG.URL.SEARCH_BY_SHOWROOMCODE_AND_LOCATION(dataUrl));
	};
	
	
	
	this.getCount = function(countUrl){
		return $http.get(SALES_CONFIG.URL.GET_SEARCH_BY_SHOWROOMCODE_AND_LOCATION_COUNT(countUrl));
	};
})