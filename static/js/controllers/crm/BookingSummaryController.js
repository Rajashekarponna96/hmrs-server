angular
		.module('srmt')
		.controller(
				"BookingSummaryController",
				function($scope, $state, notify, $stateParams, countryService,
						$stateParams, BookingSummaryService, employeeService,
						$localStorage, functionHallService,toaster) {

					
					$scope.resetSearch = function(){
						$scope.fromDate=undefined;
						$scope.toDate = undefined;
						$scope.functionHall = undefined;
						
					}
					$scope.init = function() {
						$scope.getAllFunctionHalls();
					};

					$scope.getAllFunctionHalls = function() {
						functionHallService.getAllFunctionHalls().then(
								function(response) {
									$scope.functionHallList = response.data;
								});
					};

					$scope.searchBookingSummary = function() {
						var url = "?"

						url = url + "fromDate=" + $scope.fromDate + "&"
								+ "toDate=" + $scope.toDate + "&";

						if ($scope.functionHall != undefined) {
							url = url + "functionHallId=" + $scope.functionHall.id
									+ "&";
						}
						var countUrl = url;
						countUrl = countUrl.substr(0, countUrl.length - 1);
						var dataurl = url + "page=" + $scope.page + "&size="
								+ $scope.size;

						BookingSummaryService.searchBookingSummary(dataurl)
								.then(function(response) {
									$scope.bookingList = response.data;
									$scope.getCount(countUrl);
									/* $scope.clear(); */
								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});
								})
					};
					$scope.page = 0;
					$scope.size = 10;
					$scope.getCount = function(url) {
						BookingSummaryService.getCount(url).then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					}
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
						if ($scope.toDate != undefined
								&& $scope.fromDate != undefined) {
							$scope.searchBookingSummary();
						}
					});

					$scope.reportForNonBookingSummary = function() {
						var url = "?"
						if ($scope.toDate != undefined
								&& $scope.fromDate != undefined) {
							url = url + "fromDate=" + $scope.fromDate + "&"
									+ "toDate=" + $scope.toDate + "&";
						}
						if ($scope.functionHall != undefined) {
							url = url + "functionHallId=" + $scope.functionHall.id
									+ "&";
						}
						var countUrl = url;
						countUrl = countUrl.substr(0, countUrl.length - 1);
						// var
						// dataurl=url+"page="+$scope.page+"&size="+$scope.size;

						BookingSummaryService.reportForBookingSummary(countUrl)
								.then(function(response) {
									$scope.bookingList = response.data;
									var file = new Blob([ response.data ], {
										type : 'application/pdf'
									});
									var fileURL = URL.createObjectURL(file);
									window.open(fileURL);
								})
					};
				})