var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			.state(
					'home.divisionalDetailsList',
					{
						url : '/divisionalDetailsList',
						templateUrl : './views/hrms/admin/divisionalDetails/divisionalDetailsList.html',
						controller : 'divisionalDetailsController'
					})
			.state(
					'home.addDivisionalDetail',
					{
						url : '/addDivisionalDetail',
						templateUrl : './views/hrms/admin/divisionalDetails/addDivisionDetail.html',
						controller : 'divisionalDetailsController'
					})
			.state(
					'home.editDivisionalDetail',
					{
						url : '/editDivisionalDetail',
						templateUrl : './views/hrms/admin/divisionalDetails/editDivisionalDetail.html',
						controller : 'divisionalDetailsController',
						params : {
							divisionalDetail : null
						}
					})
			.state(
					'home.viewDivisionalDetails',
					{
						url : '/viewDivisionalDetails',
						templateUrl : './views/hrms/admin/divisionalDetails/viewDivisionalDetails.html',
						controller : 'divisionalDetailsController',
						params : {
							divisionalDetail : null
						}	
					});

		});