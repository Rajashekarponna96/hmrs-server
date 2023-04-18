angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {
					$stateProvider

							.state(
									'home.employee.contactDetails',
									{

										url : '/contactDetails',
										templateUrl : './views/hrms/pim/contactDetails/contactDetails.html',
										controller : 'contactDetailController',
										params : {
											person : null
										}
									})

							.state(
									'home.employee.addContactDetail1',
									{

										url : '/addContactDetail',
										templateUrl : './views/hrms/pim/contactDetails/addContactDetail.html',
										controller : 'contactDetailController',
										params : {
											person : null
										}
									})

							.state(
									'home.employee.updateContactDetail',
									{

										url : '/updateContactDetail',
										templateUrl : './views/hrms/pim/contactDetails/updateContactDetail.html',
										controller : 'contactDetailController',
										params : {
											person : null
										}
									})

							.state(
									'home.employee.viewContactDetail',
									{

										url : '/viewContactDetail',
										templateUrl : './views/hrms/pim/contactDetails/viewContactDetail.html',
										controller : 'contactDetailController',
										params : {
											person : null
										}
									})

							.state(
									'home.employee.addContactFile',
									{

										url : '/addContactFile',
										templateUrl : './views/hrms/pim/contactDetails/addContactFile.html',
										controller : 'contactDetailController',
										params : {
											person : null
										}
									})
									.state(
									'home.employee.updateContactDocument',
									{

										url : '/updateContactDocument',
										templateUrl : './views/hrms/pim/contactDetails/updateContactDocument.html',
										controller : 'contactDetailController',
										params : {
											document : null
										}
									})
									.state(
									'home.employee.viewContactDocument',
									{

										url : '/viewContactDocument',
										templateUrl : './views/hrms/pim/contactDetails/viewContactDocument.html',
										controller : 'contactDetailController',
										params : {
											document : null
										}
									})
						
				})