var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					.state(
							'home.branchDetails',
							{
								url : '/branchDetails',
								templateUrl : './views/hrms/admin/branchDetails/branchDetails.html',
								controller : 'branchController'
							})
					.state(
							'home.addBranch',
							{
								url : '/addBranch',
								templateUrl : './views/hrms/admin/branchDetails/addBranch.html',
								controller : 'branchController'
							})
					.state(
							'home.updateBranchDetails',
							{
								url : '/editBranchDetails',
								templateUrl : './views/hrms/admin/branchDetails/editBranchDetails.html',
								controller : 'branchController',
								params:{
									branch:null
								}
							})

					.state(
							'home.viewBranch',
							{
								url : '/viewBranch',
								templateUrl : './views/hrms/admin/branchDetails/viewBranch.html',
								controller : 'branchController',
								params:{
									branch:null
								}
							})

		});