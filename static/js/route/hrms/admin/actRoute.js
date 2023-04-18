var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					.state(
							'home.actDetail',
							{
								url : '/actDetail',
								templateUrl : './views/hrms/admin/act/actDetail.html',
								controller : 'actController'
							})
					.state(
							'home.addAct',
							{
								url : '/addAct',
								templateUrl : './views/hrms/admin/act/addAct.html',
								controller : 'actController'
							})
					.state(
							'home.editAct',
							{
								url : '/editAct',
								templateUrl : './views/hrms/admin/act/editAct.html',
								controller : 'actController',
								params:{
									act:null
								}
							})

					.state(
							'home.viewAct',
							{
								url : '/viewAct',
								templateUrl : './views/hrms/admin/act/viewAct.html',
								controller : 'actController',
								params:{
									act:null
								}
							})

		});