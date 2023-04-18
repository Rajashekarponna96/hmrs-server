angular.module('srmt').service("featureService",function($http,HRM_CONFIG){
	this.addFeature=function(feature){
		return $http.post(HRM_CONFIG.URL.ADD_FEATURE(),feature)
	}
	this.getFeatures=function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_FEATURES(page,size))
	}
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_COUNT());
	};
	this.getAllFeatures=function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_FEATURES());
	}
	
})