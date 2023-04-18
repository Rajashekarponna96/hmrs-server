angular.module('srmt').service("lineOfBussinessService",function($http,SALES_CONFIG){
	
	this.getAllLineOfBussiness=function(){
		return $http.get(SALES_CONFIG.URL.GET_LINE_OF_BUSSINESS());
	};
	
	this.addLineOfBussiness = function(lob){
		return $http.post(SALES_CONFIG.URL.ADD_LINE_OF_BUSSINESS(),lob);
	};
	
	this.updateLineOfBussiness = function(id,lob){
		return $http.put(SALES_CONFIG.URL.UPDATE_LINE_OF_BUSSINESS(id),lob);
	};
	
	
})