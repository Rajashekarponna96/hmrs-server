angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							.state(
									'home.employee',
									{
										abstarct : true,
										url : '/employee',
										templateUrl : './views/hrms/pim/personalDetail/personalDeatilsView.html',
										controller : 'personalDetailController',
										params : {
											person : null
										}

									})
							.state(
									'home.employee.editPersonalDetail',
									{
										url : '/editPersonalDetail',
										templateUrl : './views/hrms/pim/personalDetail/editPersonalDetail.html',
										controller : 'personalDetailController'
									})

							.state(
									'home.viewPersonalDetail',
									{
										url : '/viewPersonalDetail',
										templateUrl : './views/hrms/pim/personalDetail/viewPersonalDetail.html',
										controller : 'personalDetailController'
									})

							.state(
									'home.employeeList',
									{
										url : '/employeeList',
										templateUrl : './views/hrms/pim/personalDetail/employeeList.html',
										controller : 'personalDetailController',
										params : {
											personObj : null
										}
									})
							.state(
									'home.employee.addPersonDetails',
									{
										url : '/addPersonalDetails',
										templateUrl : './views/hrms/pim/personalDetail/addPersonaldetail.html',
										controller : 'personalDetailController',
										params : {
											person : null
										}

									})
							// /////******document routes******////
							.state(
									'home.employee.addDocument',
									{

										url : '/addDocument',
										templateUrl : './views/hrms/pim/personalDetail/addDocument.html',
										controller : 'personalDetailController',
										params : {
											person : null
										}
									})
							.state(
									'home.employee.updateDocument',
									{

										url : '/updateDocument',
										templateUrl : './views/hrms/pim/personalDetail/updateDocument.html',
										controller : 'personalDetailController',
										params : {
											document : null
										}
									})
							.state(
									'home.employee.viewDocument',
									{

										url : '/viewDocument',
										templateUrl : './views/hrms/pim/personalDetail/viewDocument.html',
										controller : 'personalDetailController',
										params : {
											document : null
										}
									})

				})