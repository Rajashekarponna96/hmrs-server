angular
		.module('srmt')
		.controller(
				"regionalOfficeController",
				function($scope, $state, regionalOfficeService, $stateParams,
						Notification, branchService) {
					$scope.regionalOfficeDetail = $stateParams.regionalOffice;
					$scope.gotoAddRegionalOffice = function() {
						$state.go('home.addRegionalOffice');
					};
					$scope.gotoEditRegionalOffice = function(regionalOffice) {
						$state.go('home.updateregionalOffice', {
							regionalOffice : regionalOffice
						});
					};
					$scope.gotoRegionalOfficeList = function() {
						$state.go('home.regionalOfficeList');
					};

					console.log($scope.regionalOfficeDetail);
					$scope.gotoViewRegionalOffice = function(regionalOffice) {
						$state.go('home.viewRegionalOffice', {
							regionalOffice : regionalOffice
						});
					}
					$scope.address = {};

					$scope.addRegionalOffice = function() {
						$scope.regionalOffice.country = $scope.address.country.name;
						$scope.regionalOffice.state = $scope.address.state.name;
						$scope.regionalOffice.district = $scope.address.district.name;
						regionalOfficeService.addRegionalOffice(
								$scope.regionalOffice).then(
										function(response) {
											Notification
													.success({
														message : '<h4><span class="glyphicon glyphicon-ok"></span> Regional Office added successfully.</h4>',
														positionX : 'center',
														delay : 2000
													});
											$scope.gotoRegionalOfficeList();
										}, function(error) {
											Notification.error({
												message : '<span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
												positionX : 'center',
												delay : 2000
											});
										})
					}
					$scope.page = 0;
					$scope.size = 10;
					$scope.getRegionalOfficeList = function() {
						regionalOfficeService.getRegionalOfficeList(
								$scope.page, $scope.size).then(
								function(response) {
									$scope.regionalOfficeList = response.data;
									$scope.getCount();
								}, function(error) {
									Notification.error({
										message : '<span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
										positionX : 'center',
										delay : 2000
									});
								});
					}

					$scope.deleteRegionalOffice = function(regionalOffice) {
						regionalOfficeService.deleteRegionalOffice(
								regionalOffice.id).then(
										function(response) {
											Notification
													.success({
														message : '<h4><span class="glyphicon glyphicon-info-sign"></span> Deleted successfully</h4>',
														positionX : 'center',
														delay : 2000
													});
											$scope.getRegionalOfficeList();
										}, function(error) {
											Notification.error({
												message : '<span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
												positionX : 'center',
												delay : 2000
											});
										})
					}
					$scope.updateRegionalOffice = function(regionalOffice) {
						regionalOffice.country = $scope.address.country.name;
						regionalOffice.state = $scope.address.state.name;
						regionalOffice.district = $scope.address.district.name;
						regionalOfficeService.updateRegionalOffice(
								regionalOffice.id, regionalOffice).then(
										function(response) {
											Notification
													.info({
														message : '<h4><span class="glyphicon glyphicon-info-sign"></span> Regional Office updated successfully</h4>',
														positionX : 'center',
														delay : 2000
													});
											$scope.gotoRegionalOfficeList();
										}, function(error) {
											Notification.error({
												message : '<span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
												positionX : 'center',
												delay : 2000
											});
										});
					}

					
					
				/*	lookup methods*/
					$scope.getCountries = function() {
						regionalOfficeService
								.getCountries()
								.then(
										function(response) {
											$scope.countriesList = response.data;
											if ($scope.regionalOfficeDetail.country != undefined) {
												$scope.searchLookupCountries();
											}
										})
					}
					$scope.getStates = function() {
						regionalOfficeService.getStates(
								$scope.address.country.id).then(
								function(response) {
									$scope.statesList = response.data;
								})
					}
					$scope.getDistricts = function() {
						regionalOfficeService.getDistricts(
								$scope.address.state.id).then(
								function(response) {
									$scope.districtList = response.data;
								})
					}
					$scope.getCities = function() {
						regionalOfficeService.getCities().then(
								function(response) {
									$scope.citiesList = response.data;
								})
					}

					// /edit for country lookups///
					$scope.searchLookupCountries = function() {
						angular
								.forEach(
										$scope.countriesList,
										function(country) {
											console.log(country);
											console
													.log($scope.regionalOfficeDetail.country);
											if (country.name == $scope.regionalOfficeDetail.country) {

												$scope.address.country = country;
												$scope
														.searchLookupStates(country.id);
											}
										})

					};
					$scope.searchLookupStates = function(countryId) {
						regionalOfficeService
								.getStates(countryId)
								.then(
										function(response) {
											$scope.statesList = response.data;

											angular
													.forEach(
															$scope.statesList,
															function(state) {
																console
																		.log(state);
																console
																		.log($scope.regionalOfficeDetail.state);
																if (state.name == $scope.regionalOfficeDetail.state) {

																	$scope.address.state = state;
																	$scope
																			.searchLookupDistricts(state.id);
																}
															})
										})

					};
					$scope.searchLookupDistricts = function(stateId) {
						regionalOfficeService
								.getDistricts(stateId)
								.then(
										function(response) {
											$scope.districtList = response.data;

											angular
													.forEach(
															$scope.districtList,
															function(district) {
																if (district.name == $scope.regionalOfficeDetail.district) {
																	$scope.address.district = district;

																}
															})
										})
					};
					/**
					 * pagination logic
					 * 
					 * need to count total page in count menthos need to call
					 * count() in data list method.
					 * 
					 * need to call data list methis in $scope.$watchGroup([
					 * 'page', 'size' ]
					 * 
					 * need to take care about sno neeed to check recods for
					 * page need to check totla records
					 */
					$scope.getCount = function() {
						regionalOfficeService.getCount().then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					};

					$scope.prevPage = function() {
						if ($scope.page > 0) {
							$scope.page--;
						}
					};

					$scope.prevPageDisabled = function() {
						return $scope.page === 0 ? "disabled" : "";
					};

					$scope.nextPage = function() {
						if ($scope.page < $scope.totalPages - 1) {
							$scope.page++;
						}
					};

					$scope.nextPageDisabled = function() {
						return $scope.page === $scope.totalPages - 1 ? "disabled"
								: "";
					};

					$scope.firstPage = function() {
						$scope.page = 0;
					};
					$scope.lastPage = function() {
						$scope.page = $scope.totalPages - 1;

					};
					$scope.recordsPerPage = function() {
						$scope.page = 0;
						$scope.size = $scope.PerPage;
					}

					$scope.$watchGroup([ 'page', 'size' ], function(newVal,
							oldVal) {
						$scope.getRegionalOfficeList();
					});

					/**
					 * pagination logic
					 */

				});