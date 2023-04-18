var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			/** Language Details * */

			.state(
					'home.disciplineRules',
					{
						url : '/addDisciplineRule',
						templateUrl : './views/hrms/admin/disciplineRules/addDisciplineRule.html',
						controller : 'disciplineRulesController'
					})
			.state(
					'home.disciplineRuleList',
					{
						url : '/disciplineRulesList',
						templateUrl : './views/hrms/admin/disciplineRules/disciplineRuleList.html',
						controller : 'disciplineRulesController'
					})
			.state(
					'home.viewDisciplineRule',
					{
						url : '/viewDisciplineRule',
						templateUrl : './views/hrms/admin/disciplineRules/viewDisciplineRule.html',
						controller : 'disciplineRulesController',
						params: {
							disciplineRuleData : null
						}
					})
			.state(
					'home.updateDisciplineRule',
					{
						url : '/updateDisciplineRule',
						templateUrl : './views/hrms/admin/disciplineRules/updateDisciplineRule.html',
						controller : 'disciplineRulesController',
						params: {
							disciplineRuleData : null
						}
					})
		});