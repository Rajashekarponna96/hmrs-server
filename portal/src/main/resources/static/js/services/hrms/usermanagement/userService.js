angular.module('srmt').service('userService', function($http, HRM_CONFIG) {
	this.doLogin = function(user) {
		return $http.post(HRM_CONFIG.URL.DO_LOGIN(), user);
	};

	this.addUser = function(user) {
		return $http.post(HRM_CONFIG.URL.ADD_USER(), user);
	};
	this.getAllUser = function(page, size) {
		return $http.get(HRM_CONFIG.URL.GET_USERS(page, size));
	};
	
	this.updateUser = function(user) {
		return $http.put(HRM_CONFIG.URL.UPDATE_USER(user.id), user);
	};
	
	this.getCount = function() {
		return $http.get(HRM_CONFIG.URL.GET_COUNT_USERS());
	};
	
});
