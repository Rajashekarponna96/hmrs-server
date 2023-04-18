angular
		.module('srmt')
		.controller(
				"LocationController",
				function($scope, $state, LocationService, lookupService,
						 $stateParams, $localStorage,toaster) {
					
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
						lookupService.getStates(countryId).then(
								function(response) {
									$scope.statesList = response.data;
								})
					}
					$scope.getDistricts = function(stateId) {
						lookupService.getDistricts(stateId).then(
								function(response) {
									$scope.districtList = response.data;
								})
					}

					$scope.searchLookupCountries = function() {
						$scope.getCountries();
						$scope.getStates($scope.locationDetail.country.id);
						$scope.getDistricts($scope.locationDetail.state.id);
					}
					// //***lookups end///

					$scope.goToLocationList = function() {
						$state.go('home.locationDetails');
					}
					$scope.locationDetail = $stateParams.location;
					if($scope.locationDetail!=undefined){
						$scope.searchLookupCountries();
					}
					console.log($scope.locationDetail);
					$scope.goToEditLocation = function(location) {
						$state.go('home.editLocation', {
							location : location
						});
					}
					$scope.goToAddLocation = function() {
						$state.go('home.addLocation');
					}
					$scope.goToViewLocation = function(location) {
						$state.go('home.viewLocation', {
							location : location
						});
					}

				
					$scope.getAlltLocations = function() {
						LocationService.getAlltLocations().then(
								function(response) {
									$scope.locationList = response.data;
								})
					}

					$scope.addLocation = function(location) {
						LocationService
								.addLocation(location)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.goToLocationList();
										},
										function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										})
					}

					$scope.deleteLocation = function(locationId) {
						LocationService
								.deleteLocation(locationId)
								.then(
										function(response) {
											/*Notification
													.success({
														message : '<h4><span class="glyphicon glyphicon-info-sign"></span>Deleted successfully</h4>',
														positionX : 'center',
														delay : 2000
													});*/
											$scope.getAlltLocations();
										},
										function(error) {
											/*Notification
													.error({
														message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
																+ error.data.message
																+ '</h4>',
														positionX : 'center',
														delay : 2000
													});*/
										})
					};
					
					
					$scope.updateLocation = function(locationDetail) {
						LocationService
								.updateLocation(locationDetail.id, locationDetail)
								.then(
										function(response) {
											toaster
											.success({
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.goToLocationList();
										},
										function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										})
					};
					
					$scope.deleteOpen = function(id) {
						$scope.delId = id;
						var modalInstance = $uibModal.open({

							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',

						});

						modalInstance.result
								.then(
										function() {
											LocationService
													.deleteLocation(id)
													.then(
															function(response) {
																/*Notification
																		.error({
																			message : '<h4><span class="glyphicon glyphicon-trash"></span> Location deleted successfully.</h4>',
																			positionX : 'center',
																			delay : 2000
																		});*/
																$scope
																		.getAlltLocations();
															},
															function(error) {
																/*Notification
																		.error({
																			message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
																					+ error.data.message+"</h4>",
																			positionX : 'center',
																			delay : 2000
																		});*/
															})
										}, function() {

										});
					};
					
				});