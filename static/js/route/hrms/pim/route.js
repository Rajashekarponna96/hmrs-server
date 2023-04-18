var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('home.pimindex',{
				url:'/pimindex',
				abstart : true,
				templateUrl:'./views/hrms/pim/pim_index.html',
				controller:'contactDetailController'
			})
			
			.state('home.dependents',{
				url:'/dependents',
				parent: 'home.pimindex',
				templateUrl:'./views/hrms/pim/dependents/dependentsList.html',
				controller:'contactDetailController'
			})
		});