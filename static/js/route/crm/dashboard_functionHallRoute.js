var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
 
			$stateProvider
					.state(
							'home.crm.dashboard_functionHall',
							{
								url : '/dashboard_functionHall',
								templateUrl : './views/crm/dashboard/dashboard_functionHall.html',
								controller : 'dashboard_functionHallController'
							})
					 
		});