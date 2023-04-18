angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider

							.state(
									'home.selfService.myinfo.experienceDetails',
									{
										url : '/experienceDetails',
										templateUrl : './views/hrms/empSelfService/experience/experienceDetails.html',
										controller : 'experienceDetailsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.addExperience',
									{
										url : '/addExperience',
										templateUrl : './views/hrms/empSelfService/experience/addExperience.html',
										controller : 'experienceDetailsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.updateExperience',
									{
										url : '/updateExperience',
										templateUrl : './views/hrms/empSelfService/experience/updateExperience.html',
										controller : 'experienceDetailsSelfServiceController',
										params : {
											experienceData : null
										}
									})
							.state(
									'home.selfService.myinfo.viewExperience',
									{
										url : '/viewExperience',
										templateUrl : './views/hrms/empSelfService/experience/viewExperience.html',
										controller : 'experienceDetailsSelfServiceController',
										params : {
											experienceData : null
										}
									})
							.state(
									'home.selfService.myinfo.addExperienceDocument',
									{
										url : '/addExperienceDocument',
										templateUrl : './views/hrms/empSelfService/experience/addExperienceDocument.html',
										controller : 'experienceDetailsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.updateExperienceDocument',
									{
										url : '/updateExperienceDocument',
										templateUrl : './views/hrms/empSelfService/experience/updateDocument.html',
										controller : 'experienceDetailsSelfServiceController',
										params:{
											document:null
										}
									})
							.state(
									'home.selfService.myinfo.viewExperienceDocument',
									{
										url : '/viewExperienceDocument',
										templateUrl : './views/hrms/empSelfService/experience/viewDocument.html',
										controller : 'experienceDetailsSelfServiceController',
										params:{
											document:null
										}
									})
				});