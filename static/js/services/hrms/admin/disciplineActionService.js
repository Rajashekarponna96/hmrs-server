angular.module('srmt').service("disciplineActionService",function($http,HRM_CONFIG){
	
	this.addDisciplineAction = function(disciplineRuleId,disciplineAction){
				return $http.post(HRM_CONFIG.URL.ADD_DISCIPLINE_ACTION(disciplineRuleId),disciplineAction);
	};
	
	this.getDisciplineActions = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_DISCIPLINE_ACTIONS(page,size));
	};
	
	this.updateDisciplineAction = function(disciplineRuleId,disciplineActionId,disciplineAction){
		return $http.put(HRM_CONFIG.URL.UPDATE_DISCIPLINE_ACTION(disciplineRuleId, disciplineActionId),disciplineAction);
	};
	
	this.deleteDisciplineAction = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_DISCIPLINE_ACTION(id));
	};
	
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_DISCIPLINE_ACTION_COUNT())
	};
	
});