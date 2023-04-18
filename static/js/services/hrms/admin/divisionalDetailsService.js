angular.module('srmt').service("divisionalDetailsService",function($http,HRM_CONFIG){
	console.log("in service");
	this.getAllDivisionalDetails = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_DIVISIONAL_DETAILS_LIST(page,size));
	};
	this.addDivisionalDetail = function(divisionalDetail){
		return $http.post(HRM_CONFIG.URL.ADD_DIVISIONAL_DETAIL(),divisionalDetail);
	};
	this.deleteDivisionalDetail = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_DIVISIONAL_DETAIL(id));
	};
	this.updateDivisionalDetail = function(divisionalDetail){
		console.log("id hit:"+divisionalDetail.id);
		return $http.put(HRM_CONFIG.URL.UPDATE_DIVISIONAL_DETAIL(divisionalDetail.id),divisionalDetail);
	};
	
	this.getCount = function(){
		//console.log("id hit:"+divisionalDetail.id);
		return $http.get(HRM_CONFIG.URL.DIVISIONAL_DETAIL_COUNT());
	};
	
	
	
});