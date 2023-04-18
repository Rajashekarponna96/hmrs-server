angular.module("srmt").service("salesRepresentataiveService",function($http,CRM_CONFIG,HRM_CONFIG){
	this.searchSalesRepresntative=function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SERACH_SALES_REPRESENTATIVES(dataUrl))
	}
	
	this.getCount=function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SERACH_SALES_REPRESENTATIVES_COUNT(dataUrl))
	};
	
	this.getVehicleModelsBySalesRepId = function(repId){
//		return $http.get(CRM_CONFIG.URL.GET_VEHICLE_MODELS_BY_SALES_REP_ID(repId));
	};
	
	this.getLocationsBySalesRepId = function(salesRepId){
		return $http.get(HRM_CONFIG.URL.GET_LCOATIONS_BY_SALES_REP_ID(salesRepId));
	}
})

