angular.module('srmt').service('roleService',function($http,HRM_CONFIG) {

	this.addRole=function(role){
		return $http.post(HRM_CONFIG.URL.ADD_ROLE(),role)
	}
	this.getRoles=function(){
		return $http.get(HRM_CONFIG.URL.GET_ROLES())
	}
	this.updateRole = function(id,role){
		return $http.put(HRM_CONFIG.URL.UPDATE_ROLE(id),role);
	};
	
	this.getFeatureActionsByRoleId = function(roleId){
		return $http.get(HRM_CONFIG.URL.GET_FEATURE_ACTIONS_BY_ROLE_ID(roleId));
	}
	
});
