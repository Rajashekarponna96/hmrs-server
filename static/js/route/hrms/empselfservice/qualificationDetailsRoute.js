angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider

							.state(
									'home.selfService.myinfo.qualificationDetails',
									{
										url : '/qualificationDetails',
										templateUrl : './views/hrms/empSelfService/qualificationDetails/qualificationDeatils.html',
										controller : 'qualificationDetailsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.addQualoification',
									{
										url : '/addQualoification',
										templateUrl : './views/hrms/empSelfService/qualificationDetails/addQualoification.html',
										controller : 'qualificationDetailsSelfServiceController'
									})

							.state(
									'home.selfService.myinfo.updateQualification',
									{
										url : '/updateQualification',
										templateUrl : './views/hrms/empSelfService/qualificationDetails/updateQualification.html',
										controller : 'qualificationDetailsSelfServiceController',
										params : {
											qualificationData : null
										}
									})
							.state(
									'home.selfService.myinfo.viewQulaification',
									{
										url : '/viewQulaification',
										templateUrl : './views/hrms/empSelfService/qualificationDetails/viewQulaification.html',
										controller : 'qualificationDetailsSelfServiceController',
										params : {
											qualificationData : null
										}
									})
							.state(
									'home.selfService.myinfo.addQualificationDocument',
									{
										url : '/addQualificationDocument',
										templateUrl : './views/hrms/empSelfService/qualificationDetails/addQualificationDocument.html',
										controller : 'qualificationDetailsSelfServiceController'
									})
							.state(
									'home.selfService.myinfo.updateQualificationDocument',
									{
										url : '/updateQualificationDocument',
										templateUrl : './views/hrms/empSelfService/qualificationDetails/updateDocument.html',
										controller : 'qualificationDetailsSelfServiceController',
										params:{
											document:null
										}
									})
							.state(
									'home.selfService.myinfo.viewQualificationDocument',
									{
										url : '/viewQualificationDocument',
										templateUrl : './views/hrms/empSelfService/qualificationDetails/viewDocument.html',
										controller : 'qualificationDetailsSelfServiceController',
										params:{
											document:null
										}
										
									})
				});