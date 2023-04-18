	angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							
					.state(
							'home.selfService.myinfo.contactDetails',
							{
								url : '/contactDetails',
								templateUrl : './views/hrms/empSelfService/contactDetails/contactDetail.html',
								controller : 'contactDetailsSelfServiceController'
							})
							.state(
							'home.selfService.myinfo.addContactFile',
							{
								url : '/addContactFile',
								templateUrl : './views/hrms/empSelfService/contactDetails/addContactFile.html',
								controller : 'contactDetailsSelfServiceController'
							})
							.state(
							'home.selfService.myinfo.updateContactDocument',
							{
								url : '/updateContactDocument',
								templateUrl : './views/hrms/empSelfService/contactDetails/updateContactDocument.html',
								controller : 'contactDetailsSelfServiceController',
								params : {
									document : null
								}
							})
							.state(
							'home.selfService.myinfo.viewContactDocument',
							{
								url : '/viewContactDocument',
								templateUrl : './views/hrms/empSelfService/contactDetails/viewContactDocument.html',
								controller : 'contactDetailsSelfServiceController'
							})
				});									