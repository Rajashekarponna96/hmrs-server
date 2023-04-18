angular.module('srmt').service("controlService",function($http,TPT_CONFIG){
	
	this.getControlList=function(page, size){
		return $http.get(TPT_CONFIG.URL.GET_CONTROL_LIST(page, size));
	};
	
	this.getControls=function(){
		return $http.get(TPT_CONFIG.URL.GET_ALL_CONTROLS())
	};
	
	this.addControl=function(control){
		return $http.post(TPT_CONFIG.URL.ADD_CONTROL(),control)
	};
	
	this.updateControl=function(id,control){
		return $http.put(TPT_CONFIG.URL.UPDATE_CONTROL(id),control)
	};
	
	/*this.deleteControl=function(id){
		return $http.delete(TPT_CONFIG.URL.DELETE_CONTROL(id))
	};*/
	
	this.getCount = function(){
		return $http.get(TPT_CONFIG.URL.GET_CONTROLS_COUNT());
	};
	
})