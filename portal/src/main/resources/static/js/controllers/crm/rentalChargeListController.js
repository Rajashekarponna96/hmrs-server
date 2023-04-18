angular
		.module('srmt')
		.controller(
				"rentalChargeListController",
				function($scope, $state, rentalChargeService, reportService, $localStorage,toaster
						) {
					
					
					
					$scope.gotoAddRentalCharge = function() {
						$state.go('home.crm.addRentalCharge');
					};

					$scope.gotoRentalChargeList = function() {
						$state.go("home.crm.rentalChargeList");
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
					$scope.page = 0;
					$scope.size = 10;
					$scope.getCount = function() {
						rentalChargeService.getCount().then(
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
						$scope.getAllRentalCharges();
						$scope.getCount();
					});

					/**
					 * pagination logic
					 */

					$scope.getAllRentalCharges = function() {
						rentalChargeService
								.getRentalChargeList($scope.page, $scope.size)
								.then(
										function(response) {
											$scope.rentalChargeList = response.data;
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
					$scope.gotoUpdateRentalCharge = function(thisrentalCharge) {
						
						$state.go("home.crm.updateRentalCharge", {
							rentalCharge : thisrentalCharge
						});
					};

					$scope.rentalcardReport = function() {
						console.log("in print method");
						reportService.rentalChargeList().then(
								function(response) {
									var file = new Blob([ response.data ], {
										type : 'application/pdf'
									});
									var fileURL = URL.createObjectURL(file);
									window.open(fileURL);
								})
					};
					
					$scope.viewRentalCharge = function(thisrentalCharge) {
						$state.go("home.crm.viewRentalCharge", {
							rentalCharge : thisrentalCharge
						});
					};

					
				})