angular
		.module('srmt')
		.controller(
				"customerController",
				function($scope, $state, segmentService, $stateParams,
						lineOfBussinessService, $localStorage, toaster,
						customerService, employeeService, countryService,
						stateService, districtService, productLineService) {
					
					$scope.gotoCustomerList=function(){
						$state.go('home.tdv.customerList');
					}

					$scope.getAllSalesRepresentatives = function() {
						employeeService
								.getAllSalesRepresentatives()
								.then(
										function(response) {
											$scope.salesRepresentativeList = response.data;
										})
					};

					$scope.getAllCountries = function() {
						countryService.getCountries().then(function(response) {
							$scope.countryList = response.data;
						})
					};

					$scope.getStatesByCountryId = function(countryId) {
						stateService.getStates(countryId).then(
								function(response) {
									$scope.stateList = response.data;
								})
					}

					$scope.getDistrictsByStateId = function(stateId) {
						districtService.getDistricts(stateId).then(
								function(response) {
									$scope.districtList = response.data;
								})
					};

					$scope.getLocationsAndProductLinesById = function(
							salesRepId) {
						employeeService
								.getLocationsAndVehicleModelsById(salesRepId)
								.then(
										function(response) {
											$scope.locationsAndModels = response.data;
											$scope.productLines = $scope.locationsAndModels.productLines;
											$scope.locations = $scope.locationsAndModels.locations;

											console
													.log($scope.locationsAndModels);
										})
					};
					$scope.searchLookupCountries = function() {
						$scope.getAllCountries();
						$scope
								.getStatesByCountryId($scope.customerDetail.address.country.id);
						$scope
								.getDistrictsByStateId($scope.customerDetail.address.state.id);
					}

					$scope.onChange = function() {
						var a=Number($scope.customerDetail.vehicleQuantity || 1);
						var b=Number($scope.customerDetail.pricePerVehicle.amount||0);
						$scope.customerDetail.totalCost = a*b;
						var c=Number($scope.customerDetail.totalCost || 0);
						var d=Number($scope.customerDetail.taxAmount.amount || 0);
						var e=Number($scope.customerDetail.trAmount.amount || 0);
						var f=Number($scope.customerDetail.otherCharges.amount || 0);
						var g=Number($scope.customerDetail.vehicleInsurance.amount || 0);
						$scope.customerDetail.grandTotal=c+d+e+f+g;
						
					}
					
					$scope.onChangeForAdd = function() {
						var a=Number($scope.customer.vehicleQuantity || 1);
						var b=Number($scope.customer.pricePerVehicle.amount||0);
						$scope.customer.totalCost = a*b;
						var c=Number($scope.customer.totalCost || 0);
						var d=Number($scope.customer.taxAmount.amount || 0);
						var e=Number($scope.customer.trAmount.amount || 0);
						var f=Number($scope.customer.otherCharges.amount || 0);
						var g=Number($scope.customer.vehicleInsurance.amount || 0);
						$scope.customer.grandTotal=c+d+e+f+g;
						
					}
					$scope.customerDetail = $stateParams.customer;
					if ($scope.customerDetail != undefined) {
						$scope.searchLookupCountries();

					}

					console.log($scope.customerDetail);
					$scope.gotoUpdateCustomer = function(customer) {
						$state.go('home.tdv.updateCustomer', {
							customer : customer
						});
					}

					$scope.gotoViewCustomer = function(customer) {
						$state.go('home.tdv.viewCustomer', {
							customer : customer
						});
					}

					$scope.getAllSegments = function() {
						segmentService.getAllSegments().then(
								function(response) {
									$scope.segmentsList = response.data;
								});
					};
					$scope.getCustomers = function() {
						customerService.getCustomers($scope.page,$scope.size).then(function(response) {
							$scope.customersList = response.data;
							$scope.getCount();
						});
					};

					$scope.addCustomer = function(customer) {
						customerService.addCustomer(customer).then(
								function(response) {
									toaster.success({
										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoCustomerList();
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

					$scope.updateCustomer = function(customerDetail) {
						customerService.updateCustomer(customerDetail.id,
								customerDetail).then(function(response) {
							toaster.success({
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoCustomerList();
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
					
					$scope.PerPage = 10;
					$scope.size = 10;
					$scope.page = 0;
					/**
					 * pagination logic
					 * 
					 * need to count total page in count menthos need to call count() in
					 * data list method.
					 * 
					 * need to call data list methis in $scope.$watchGroup([ 'page',
					 * 'size' ]
					 * 
					 * need to take care about sno neeed to check recods for page need
					 * to check totla records
					 */

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
						return $scope.page === $scope.totalPages - 1 ? "disabled" : "";
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

					$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
						$scope.getCustomers();
					});

					$scope.getCount = function() {
						customerService.getCount().then(function(response) {
							$scope.count = response.data;
							$scope.totalPages = Math.ceil($scope.count / $scope.size);
						});
					};

					/**
					 * pagination logic
					 */
					
					
					$scope.generatReport = function(id) {
						customerService.getPrint(id).then(
								function(response) {
									var file = new Blob([ response.data ], {
										type : 'application/pdf'
									});
									var fileURL = URL.createObjectURL(file);
									window.open(fileURL);
								});
					};


				})