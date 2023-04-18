angular.module('srmt').service("actService", function(HRM_CONFIG, $http) {
	this.addAct = function(act) {
		return $http.post(HRM_CONFIG.URL.ADD_ACT(),act);
	};
	this.getActs = function() {
		return $http.get(HRM_CONFIG.URL.GET_ALL_ACTS());
	};
	
	this.deleteAct=function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_ACT(id));
	}
	this.updateAct=function(id,act){
		return $http.put(HRM_CONFIG.URL.EDIT_ACT(id),act);
	}
})