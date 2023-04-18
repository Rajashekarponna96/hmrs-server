angular
		.module('srmt')
		.controller(
				"marriageCertificateController",
				function($scope, $state, paymentService, hallRoomService,
						$filter, notify, $stateParams, $localStorage,bookingInfoService,
						$uibModal, reportService) {

					$scope.certificate = $stateParams.bill;
					
					/*
					 * * pagination logic
					 * 
					 * need to count total page in count menthos need to call
					 * count() in data list method.
					 * 
					 * need to call data list methis in $scope.$watchGroup([
					 * 'page', 'size' ]
					 * 
					 * need to take care about sno neeed to check recods for
					 * page need to check totla records
					 *//*
					 */

					$scope.page = 0;
					$scope.size = 10;

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
						$scope.searchBookingsWithMarriageDateAndCustomerNumberForMarriageCertificate();
					});

					$scope.searchBookingsWithMarriageDateAndCustomerNumberForMarriageCertificate = function() {

						var url2 = "?"
						if ($scope.marriageDate != undefined) {
							$scope.marriageDate = $filter('date')(
									$scope.marriageDate, 'dd-MM-yyyy');
							url2 = url2 + "marriageDate=" + $scope.marriageDate + "&";
						}
						if ($scope.mobileNumber != undefined) {
							url2 = url2 + "mobile=" + $scope.mobileNumber
									+ "&";
						}

						var countUrl2 = url2;
						countUrl2 = countUrl2.substr(0, countUrl2.length - 1);
						var dataUrls = url2 + "page=" + $scope.page + "&size="
								+ $scope.size;
						bookingInfoService
								.searchBookingsWithMarriageDateAndCustomerNumberForMarriageCertificate(
										dataUrls)
								.then(
										function(response) {
											$scope.certificateList = response.data;
											$scope
													.getMatchedCertificatesCount(countUrl2);
										})
						
					};

					$scope.getMatchedCertificatesCount = function(countUrl) {

						bookingInfoService.marriageCertificateCount(countUrl)
								.then(
										function(response) {
											$scope.count = response.data;
											$scope.totalPages = Math
													.ceil($scope.count
															/ $scope.size);
										});
					};

					$scope.gotoViewCertificate = function(bill) {
						$state.go("home.crm.viewMarriageCertificate", {
							bill : bill
						});
					};

					$scope.gotoPrintCertiificate = function(billId) {
						paymentService.printCertificate(billId).then(
								function(response) {
									var file = new Blob([ response.data ], {
										type : 'application/pdf'
									});
									var fileURL = URL.createObjectURL(file);
									window.open(fileURL);
								})
					};

					$scope.gotoCertificateList = function() {
						$state.go("home.crm.marriageCertificate");
					};
					$scope.generatemarriageCertificate = function(id) {
						reportService.marriageCerificatePrint(id).then(
								function(response) {
									var file = new Blob([ response.data ], {
										type : 'application/pdf'
									});
									var fileURL = URL.createObjectURL(file);
									window.open(fileURL);
								});
					};

				});