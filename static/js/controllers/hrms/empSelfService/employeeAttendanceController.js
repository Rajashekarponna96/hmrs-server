
angular
		.module('srmt')
		.controller(
				"employeeAttendanceController",
				function($scope, $state, jobDetailService, personalService,
						employeeAttendanceService, $localStorage, designationService,
						employmentTypeService, notify, $filter,
						personalDetailsSelfService,toaster) {
					
					

					$scope.person = personalDetailsSelfService.getEmployee();
					console.log($scope.person);
					$scope.page = 0;
					$scope.size = 10;
					$scope.getAttendanceByEmpId = function() {
						$scope.getCount();
						employeeAttendanceService
								.getAttendanceByEmpId($localStorage.loginId,
										$scope.page, $scope.size)
								.then(
										function(response) {
											console.log("service called");
											$scope.empAttendanceList = response.data;
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
					$scope.getCount = function(countUrl) {
						employeeAttendanceService.getCount(
								$localStorage.loginId, countUrl).then(
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
						$scope.searchMonthlyAttendance();
					});

					/**
					 * pagination logic
					 */

					$scope.validate = function() {
						console.log("validate");
						if ($scope.fromDate != undefined
								&& $scope.toDate != undefined) {
							if ($scope.employee != undefined)
								return true;
							if ($scope.department != undefined)
								return true;
							if ($scope.location != undefined)
								return true;
						}

					};

					$scope.searchMonthlyAttendance = function() {
						var url = "?";
						if ($scope.month != undefined) {
							url = url + "month=" + $scope.month + "&";
						}
						if ($scope.year != undefined) {
							url = url + "year=" + $scope.year + "&";
						}
						var countUrl = url;
						console.log(countUrl);
						url = url + "page=" + $scope.page + "&size="
								+ $scope.size;
						employeeAttendanceService.searchMonthlyAttendance(
								$localStorage.loginId, url).then(
								function(response) {
									$scope.empAttendanceList = response.data;
									$scope.getCount(countUrl);
								})
					}

				})