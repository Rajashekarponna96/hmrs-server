var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			/** Leave Period * */

			.state(
					'home.leavePeriodList',
					{
						url : '/leavePeriodList',
						templateUrl : './views/hrms/admin/leavePeriod/leavePeriodList.html',
						controller : 'leavePeriodController'
					})
			.state(
					'home.addLeavePeriod',
					{
						url : '/addLeavePeriod',
						templateUrl : './views/hrms/admin/leavePeriod/addLeavePeriod.html',
						controller : 'leavePeriodController',
						params : {
							leavePeriodData : null
						}
					})
			.state(
					'home.updateLeavePeriod',
					{
						url : '/updateLeavePeriod',
						templateUrl : './views/hrms/admin/leavePeriod/updateLeavePeriod.html',
						controller : 'leavePeriodController',
						params : {
							leavePeriodData : null
						}
					})
			.state(
					'home.viewLeavePeriod',
					{
						url : '/viewLeavePeriod',
						templateUrl : './views/hrms/admin/leavePeriod/viewLeavePeriod.html',
						controller : 'leavePeriodController',
						params : {
							leavePeriodData : null
						}
					})
			
		});