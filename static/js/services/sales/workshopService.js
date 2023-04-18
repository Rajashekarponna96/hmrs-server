angular.module('srmt').service("workshopService",function($http,SALES_CONFIG){
	
	this.getWorkshopList=function(page,size){
		return $http.get(SALES_CONFIG.URL.GET_WORKSHOP_LIST(page,size));
	};
	
	this.addWorkshop = function(workshop){
		return $http.post(SALES_CONFIG.URL.ADD_WORKSHOP(),workshop);
	};
	
	this.updateWorkshop = function(workshopId,workshop){
		return $http.put(SALES_CONFIG.URL.UPDATE_WORKSHOP(workshopId),workshop);
	};
	
	this.getCount = function(dataUrl){
		return $http.get(SALES_CONFIG.URL.SEARCH_WORK_SHOPS_COUNT(dataUrl));
	}
	
	this.searchWorkShop=function(dataUrl){
		return $http.get(SALES_CONFIG.URL.SEARCH_WORK_SHOPS(dataUrl))
	}
})