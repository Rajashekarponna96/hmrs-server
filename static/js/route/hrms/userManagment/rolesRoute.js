angular.module('srmt').config(function($stateProvider,$urlRouterProvider){
	$stateProvider.state('home.usermgmt.rolesList',{
		url:'/rolesList',
		templateUrl:'./views/hrms/usermanagement/roles/roleList.html',
		controller:'rolesController'
	})
	.state('home.usermgmt.addRole',{
		url:'/addRole',
		templateUrl:'./views/hrms/usermanagement/roles/addRole.html',
		controller:'rolesController'
	})
	.state('home.usermgmt.updateRole',{
		url:'/updateRole',
		templateUrl:'./views/hrms/usermanagement/roles/updateRole.html',
		controller:'rolesController',
		params : {
			role: null
		}
	})
})