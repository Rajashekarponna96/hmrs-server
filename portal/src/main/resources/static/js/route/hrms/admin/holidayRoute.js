var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			.state(
					'home.holidaysList',
					{
						url : '/holidaysList',
						templateUrl : './views/hrms/admin/holidays/holidaysList.html',
						controller : 'holidaysController',
						params : {
							holidayData : null
						}
					})
			.state(
					'home.addHoliday',
					{
						url : '/addHoliday',
						templateUrl : './views/hrms/admin/holidays/addHoliday.html',
						controller : 'holidaysController',
						params : {
							holidayData : null
						}
					})
			.state(
					'home.updateHoliday',
					{
						url : '/editHoliday',
						templateUrl : './views/hrms/admin/holidays/editHoliday.html',
						controller : 'holidaysController',
						params : {
							holidayData : null
						}
					})
			.state(
					'home.viewHoliday',
					{
						url : '/viewHoliday',
						templateUrl : './views/hrms/admin/holidays/viewHoliday.html',
						controller : 'holidaysController',
						params : {
							holidayData : null
						}
					})
		});