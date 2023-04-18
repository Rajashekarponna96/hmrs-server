var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

					.state(
							'home.organisationStructureDetails',
							{
								url : '/organisationStructureDetails',
								templateUrl : './views/hrms/admin/organisationStructure/organisationStructureDetails.html',
								controller : 'organisationStructureController'

							})
					.state(
							'home.addUnit',
							{
								url : '/addUnit',
								templateUrl : './views/hrms/admin/organisationStructure/addUnit.html',
								controller : 'organisationStructureController'

							})
					.state(
							'home.addSubUnit',
							{
								url : '/addSubUnit',
								templateUrl : './views/hrms/admin/organisationStructure/addSubUnit.html',
								controller : 'organisationStructureController'

							})
					.state(
							'home.editOrganisationStructure',
							{
								url : '/editOrganisationStructure',
								templateUrl : './views/hrms/admin/organisationStructure/editOrganisationStructure.html',
								controller : 'organisationStructureController'

							})

		});