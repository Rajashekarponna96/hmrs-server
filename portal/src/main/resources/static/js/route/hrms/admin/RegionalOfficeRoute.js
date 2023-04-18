var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					/** Regional Office * */
					.state(
							'home.regionalOfficeList',
							{
								url : '/regionalOfficeList',
								templateUrl : './views/hrms/admin/regionalOffice/regionalOfficeList.html',
								controller : 'regionalOfficeController'
							})
					.state(
							'home.addRegionalOffice',
							{
								url : '/addRegionalOffice',
								templateUrl : './views/hrms/admin/regionalOffice/addRegionalOffice.html',
								controller : 'regionalOfficeController'
							})
					.state(
							'home.updateregionalOffice',
							{
								url : '/updateregionalOffice',
								templateUrl : './views/hrms/admin/regionalOffice/updateregionalOffice.html',
								controller : 'regionalOfficeController',
								params:{
									regionalOffice:null
								}
							
							})
					.state(
							'home.viewRegionalOffice',
							{
								url : '/viewRegionalOffice',
								templateUrl : './views/hrms/admin/regionalOffice/viewRegionalOffice.html',
								controller : 'regionalOfficeController',
								params:{
									regionalOffice:null
								}
							})

		});
