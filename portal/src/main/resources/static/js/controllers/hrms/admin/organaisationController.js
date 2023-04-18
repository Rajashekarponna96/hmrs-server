angular.module('srmt').controller(
		"organaisationController",
		function($scope, lookupService, $state, organizationService,
				$localStorage,toaster) {

			console.log("organizationControoller  called");

		

			/*
			 * LOOKUP METHODS
			 */
			
			$scope.getCountries = function() {
				lookupService.getCountries().then(function(response) {
					$scope.countriesList = response.data;
					
				})
			}
			$scope.getStates = function(countryId) {
				console.log(countryId);
				// console.log($scope.organization.address.state.id);
				lookupService.getStates(countryId).then(function(response) {
					$scope.statesList = response.data;
				})
			}
			$scope.getDistricts = function(stateId) {
				lookupService.getDistricts(stateId).then(function(response) {
					$scope.districtList = response.data;
				})
			}
			$scope.getCities = function(districtId) {
				lookupService.getCities(districtId).then(function(response) {
					$scope.citiesList = response.data;
				})
			}
			$scope.searchLookupCountries = function() {
				$scope.getStates($scope.organization.address.country.id);
				$scope.getDistricts($scope.organization.address.state.id);
			}

			$scope.positions = [ 'center', 'left', 'right' ];
			$scope.position = $scope.positions[0];
			$scope.organization = {};

			$scope.duration = 10000;
			$scope.addOrganisationDetails = function() {
				organizationService.addOrganiZation($scope.organization).then(
						function(response) {
							toaster
							.success({
							
								body : 'Saved Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.findOrganizationByFirst();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			}

			$scope.findOrganizationByFirst = function() {
				$scope.getCountries();

				organizationService.findOrganizationFirst().then(
						function(response) {
							$scope.organization = response.data;

						
							if ($scope.organization.id != undefined) {

								$scope.searchLookupCountries();
							}

						}, function(error) {

						
							if ($scope.organization.id != undefined) {

								$scope.searchLookupCountries();
							}

						});
			}

			$scope.updateOrganization = function() {
				organizationService.updateOrganization($scope.organization)
						.then(function(response) {
							toaster
							.success({
							
								body : 'Saved Successfully',
								showCloseButton : true,
								timeout : 4000
							});
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};
			
			$scope.featureActionList = $localStorage.featureActionList;

			$scope.hasFeatureWithAction = function(name) {
				var feature=undefined;
				
				var found = false;
				angular.forEach($scope.featureActionList, function(
						featureAction) {
					
					if (featureAction.feature.name == name) {
						feature = featureAction;
					}
				});
				return feature;
				
			};


		})