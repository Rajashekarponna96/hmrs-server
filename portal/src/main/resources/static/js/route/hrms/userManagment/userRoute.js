angular.module('srmt').config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider.state('home.usermgmt', {
		url : '/usermgmt',
		abstart : true,
		templateUrl : "views/common/sub-content.html",
		controller : 'userController'
	}).state('home.usermgmt.userList', {
		url : '/userList',
		templateUrl : './views/hrms/usermanagement/user/userList.html',
		controller : 'userController'

	}).state('home.usermgmt.addUser', {

		url : '/addUser',
		templateUrl : './views/hrms/usermanagement/user/addUser.html',
		controller : 'userController'

	}).state('home.usermgmt.updateUser', {

		url : '/updateUser',
		templateUrl : './views/hrms/usermanagement/user/updateUser.html',
		controller : 'userController',
		params : {
			user : null
		}
	}).state('home.usermgmt.viewUser', {

		url : '/viewUser',
		templateUrl : './views/hrms/usermanagement/user/viewUser.html',
		controller : 'userController',
		params : {
			user : null
		}
	})

});