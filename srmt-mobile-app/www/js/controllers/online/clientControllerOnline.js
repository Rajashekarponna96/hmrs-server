angular
		.module('srmt')
		.controller(
				"clientControllerOnline",
				function($scope, $state, clientServiceOnline,
						onlineCountryService, onlineStateService,
						onlineDistrictService, $stateParams, $localStorage,
						onlinePersonalInfoService, $cordovaNetwork, $http,
						$cordovaNetwork, clientServiceOffline) {

					$scope.getAllCountries = function() {
						onlineCountryService.getCountries().then(
								function(response) {
									$scope.countryList = response.data;
								})
					};
					$scope.customerList = [];
					$scope.clientDetail = $stateParams.client;

					$scope.getStatesByCountryId = function(countryId) {
						onlineStateService.getStates(countryId).then(
								function(response) {
									$scope.stateList = response.data;
								})
					};

					$scope.getDistrictsByStateId = function(stateId) {
						onlineDistrictService.getDistricts(stateId).then(
								function(response) {
									$scope.districtList = response.data;
								})
					};

					
					onlinePersonalInfoService.getSalesRepresentative(
							$localStorage.loginId).then(function(response) {
								console.log("getting current user details..");
						$scope.salesRepresentative = response.data;
						// console.log($scope.salesRepresentative);

					})
					$scope.addCustomer= function(customer) {
						console.log("sdr : "+angular.toJson($scope.salesRepresentative));
						customer.salesRepresentative = $scope.salesRepresentative;
						clientServiceOnline.addCustomer(customer).then(
								function(response) {
									$state.go('app.clientList');
								}, function(error) {
									alert("failed");
								})
					};

					$scope.page = 0;
					$scope.size = 10;
					$scope.getCount = function() {
						clientServiceOnline.getCustomersCount().then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								})
					};

					$scope.getCustomers = function() {
						console.log("in get customers");
						clientServiceOnline
								.getCustomerList($localStorage.loginId, $scope.page, $scope.size)
								.then(
										function(response) {
											$scope.customerList = $scope.customerList
													.concat(response.data);

											clientServiceOffline
													.deleteDb()
													.then(
															function(success) {
																clientServiceOffline
																		.bulkPost($scope.customerList);
															});

											$scope
													.$broadcast('scroll.infiniteScrollComplete');
											$scope.page = $scope.page + 1;
											$scope.getCount();
										});
					};
					$scope.init = function() {
						$scope.customerList = [];
						if ($cordovaNetwork == undefined
								&& $cordovaNetwork.isOffline()) {
							console.log("is offline")
							clientServiceOffline
									.getAllDocs()
									.then(
											function(response) {
												if (response.rows.length > 0) {
													console
															.log("response.rows"
																	+ angular
																			.toJson(response.rows));
												}
											});

						} else {
							$scope.getCustomers();
						}

					};

					$scope.gotoViewCustomer = function(client) {
						console.log("view customer clicked");
						$state.go("app.viewClient", {
							client : client
						});
					};
					
					$scope.getLocationsAndVehicleModelsById = function(){
						clientServiceOnline
						.getLocationsAndVehicleModelsById(
								$localStorage.loginId)
						.then(
								function(response) {	
									$scope.locationsAndProductLines = response.data;
									$scope.productLines = $scope.locationsAndProductLines.productLines;
									$scope.locations = $scope.locationsAndProductLines.locations;
								})
					};
					$scope.customer = {pricePerVehicle:'',taxAmount:'',trAmount:'',otherCharges:'',vehicleInsurance:''};
					$scope.onChange = function() {
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
				})