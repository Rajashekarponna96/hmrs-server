angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider

							.state(
									'home.selfService.myinfo.dependentDetails',
									{
										url : '/dependentDetails',
										templateUrl : './views/hrms/empSelfService/dependents/dependentDetails.html',
										controller : 'dependentsSelfServiceController'
									})

							.state(
									'home.selfService.myinfo.addDependentDetail',
									{
										url : '/addDependentDetail',
										templateUrl : './views/hrms/empSelfService/dependents/addDependentDetail.html',
										controller : 'dependentsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.updatedependentDetail',
									{
										url : '/updatedependentDetail',
										templateUrl : './views/hrms/empSelfService/dependents/updatedependentDetail.html',
										controller : 'dependentsSelfServiceController',
										params:{
											dependent:null
										}
									})
							.state(
									'home.selfService.myinfo.addDependentDocument',
									{
										url : '/addDependentDocument',
										templateUrl : './views/hrms/empSelfService/dependents/addDependentDocument.html',
										controller : 'dependentsSelfServiceController',
										
									})
									.state(
									'home.selfService.myinfo.updateDependentDocument',
									{
										url : '/updateDependentDocument',
										templateUrl : './views/hrms/empSelfService/dependents/updateDocument.html',
										controller : 'dependentsSelfServiceController',
										params:{
											document:null
										}
									})
									.state(
									'home.selfService.myinfo.viewDependentDocument',
									{
										url : '/viewDependentDocument',
										templateUrl : './views/hrms/empSelfService/dependents/viewDocument.html',
										controller : 'dependentsSelfServiceController',
										params:{
											document:null
										}
									})
				});