var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			/** Language Details * */

			.state(
					'home.addDisciplineAction',
					{
						url : '/addDisciplineAction',
						templateUrl : './views/hrms/admin/disciplineActions/addDisciplineAction.html',
						controller : 'disciplineActionController'
					})
			.state(
					'home.disciplineActionsList',
					{
						url : '/disciplineActionList',
						templateUrl : './views/hrms/admin/disciplineActions/disciplineActionList.html',
						controller : 'disciplineActionController'
					})
			.state(
					'home.viewDisciplineAction',
					{
						url : '/viewDisciplineAction',
						templateUrl : './views/hrms/admin/disciplineActions/viewDisciplineAction.html',
						controller : 'disciplineActionController',
						params : {
							disciplineActionData : null
						}
					})
			.state(
					'home.updateDisciplineAction',
					{
						url : '/updateDisciplineAction',
						templateUrl : './views/hrms/admin/disciplineActions/updateDisciplineAction.html',
						controller : 'disciplineActionController',
						params : {
							disciplineActionData : null
						}
					})
		});