var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					.state(
							'home.actSheduledetail',
							{
								url : '/actSheduledetail',
								templateUrl : './views/hrms/admin/actShedule/actSheduledetail.html',
								controller : 'actSheduleController'
							})
					.state(
							'home.addActShedule',
							{
								url : '/addActShedule',
								templateUrl : './views/hrms/admin/actShedule/addActShedule.html',
								controller : 'actSheduleController'
							})
					.state(
							'home.editActShedule',
							{
								url : '/editActShedule',
								templateUrl : './views/hrms/admin/actShedule/editActShedule.html',
								controller : 'actSheduleController',
								params:{
									actShedule:null
								}
							})

					.state(
							'home.viewActshedule',
							{
								url : '/viewActshedule',
								templateUrl : './views/hrms/admin/actShedule/viewActshedule.html',
								controller : 'actSheduleController',
								params:{
									actShedule:null
								}
							})

		});