angular.module('srmt').service("actSheduleService", function(HRM_CONFIG, $http) {
	this.addActShedule = function(actId,actShedule) {
		return $http.post(HRM_CONFIG.URL.ADD_ACTSHEDULE(actId),actShedule);
	};
	this.getActShedules = function(id) {
		return $http.get(HRM_CONFIG.URL.GET_ALL_ACTSHEDULE(id));
	};
	
	this.deleteActShedule=function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_ACTSHEDULE(id));
	}
	this.updateActShedule=function(actId,actSheduleId,actShedule){
		return $http.put(HRM_CONFIG.URL.EDIT_ACTSHEDULE(actId,actSheduleId),actShedule);
	};
	
	this.getAllactschedules = function(){
		return $http.get(HRM_CONFIG.URL.GET_ALL_ACT_SCHEDULES());
	};
	this.searchActShedules = function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_ACTSHEDULES(dataUrl));
	};
})