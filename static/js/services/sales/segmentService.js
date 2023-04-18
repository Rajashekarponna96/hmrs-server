angular.module('srmt').service("segmentService",function($http,SALES_CONFIG){
	
	this.getAllSegments=function(){
		return $http.get(SALES_CONFIG.URL.GET_SEGMENTS());
	};
	
	this.addSegment = function(segment){
		return $http.post(SALES_CONFIG.URL.ADD_SEGMENT(),segment);
	};
	
	this.updateSegment = function(id,segment){
		return $http.put(SALES_CONFIG.URL.UPDATE_SEGMENT(id),segment);
	};
	
	
})