angular.module('srmt').service("disciplineService",function($http,HRM_CONFIG){
	
	this.addDiscipline = function(discipline){
				return $http.post(HRM_CONFIG.URL.ADD_DISCIPLINE_RULE(),discipline);
	};
	
	this.getDisciplineRules = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_DISCIPLINE_RULES(page,size));
	};
	
	this.updateDisciplineRule = function(disciplineId,discipline){
		return $http.put(HRM_CONFIG.URL.UPDATE_DISCIPLINE_RULE(disciplineId),discipline);
	};
	
	this.deleteDisciplineRule = function(id){
		return $http.delete(HRM_CONFIG.URL.DELETE_DISCIPLINE_RULE(id));
	};
	
	this.getCount = function(){
		return $http.get(HRM_CONFIG.URL.GET_DISCIPLINE_RULE_COUNT());
	};
	
	this.findAllDisciplineRules = function(){
		return $http.get(HRM_CONFIG.URL.FIND_ALL_DISCIPLINE_RULES());
	}
	
});