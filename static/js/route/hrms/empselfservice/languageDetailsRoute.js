angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider

							.state(
									'home.selfService.myinfo.languageDetails',
									{
										url : '/languageDetails',
										templateUrl : './views/hrms/empSelfService/languageDetails/languageDetails.html',
										controller : 'languageDetailsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.addLanguage',
									{
										url : '/addLanguage',
										templateUrl : './views/hrms/empSelfService/languageDetails/addLanguage.html',
										controller : 'languageDetailsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.updateLanguage',
									{
										url : '/updateLanguage',
										templateUrl : './views/hrms/empSelfService/languageDetails/updateLanguage.html',
										controller : 'languageDetailsSelfServiceController',
										params:{
											languageProficiencyData:null
										}
									})
							.state(
									'home.selfService.myinfo.viewLanguage',
									{
										url : '/viewLanguage',
										templateUrl : './views/hrms/empSelfService/languageDetails/viewLanguage.html',
										controller : 'languageDetailsSelfServiceController'
									})
				});