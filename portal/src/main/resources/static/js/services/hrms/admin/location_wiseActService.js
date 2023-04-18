angular.module('srmt').service("location_wiseActService",function($http,HRM_CONFIG){
	this.addLocationWiseAct = function(loacationDept){
		return $http.put(HRM_CONFIG.URL.ADD_LOCATION_DEPT(loacationDept.id),loacationDept);
	};
	
	this.getLocationWiseActs = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LOCATION_WISE_ACT(page,size));
	};
	this.updateLocationWiseActs = function(act){
		return $http.put(HRM_CONFIG.URL.UPDATE_LOCATION_WISE_ACT(act.id),act);
	};
	
	this.deleteLocationWiseAct = function(actId){
		return $http.delete(HRM_CONFIG.URL.DELETE_LOCATION_WISE_ACT(actId));
	};
	
	this.getCount = function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_LOCATION_WISE_ACT_COUNT(dataUrl));
	};
	
	this.addLocationWiseActMapping = function(id,sheduleId,loacationDept){
		return $http.post(HRM_CONFIG.URL.ADD_LOCATION_WISE_ACT(id,sheduleId),loacationDept);
	};
	
	this.getLocationWiseActsWithPagination = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LOCATION_WISE_ACTS_BY_PAGINATION(page,size));
	};
	
	this.searchLocationWiseActs=function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_LOCATION_WISE_ACT(dataUrl))
	}
	
});
