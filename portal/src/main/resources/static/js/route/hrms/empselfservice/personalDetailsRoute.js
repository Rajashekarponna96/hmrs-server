angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider

							.state(
									'home.selfService.myinfo.updatePersonalDetail',
									{
										url : '/updatePersonalDetail',
										templateUrl : './views/hrms/empSelfService/personalDetails/updatePersonalDetail.html',
										controller : 'personalDetailsSelfServiceController'
									})

							.state(
									'home.selfService.myinfo.addDocument',
									{
										url : '/addDocument',
										templateUrl : './views/hrms/empSelfService/personalDetails/addDocument.html',
										controller : 'personalDetailsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.updateDocument',
									{
										url : '/updateDocument',
										templateUrl : './views/hrms/empSelfService/personalDetails/updateDocument.html',
										controller : 'personalDetailsSelfServiceController',
										params:{
											document:null
										}
									})
							.state(
									'home.selfService.myinfo.viewDocument',
									{
										url : '/viewDocument',
										templateUrl : './views/hrms/empSelfService/personalDetails/viewDocument.html',
										controller : 'personalDetailsSelfServiceController',
										params:{
											document:null
										}
									})
				});