
angular
		.module('srmt')
		.controller(
				"myLeavesController",
				function($scope, $state, jobDetailService, personalService,
						myLeaveService, $localStorage, leavePeriodService,
						 designationService,
						employmentTypeService, notify, $filter,
						personalDetailsSelfService,toaster) {
					
					
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

					});

					$scope.getCount = function() {
						employeeAttendanceService
								.getCount($localStorage.loginId)
								.then(
										function(response) {
											console.log("service called");
											$scope.count = response.data;
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

					$scope.gotoMyLeavesList = function() {
						$state.go("home.selfService.myLeaveDetails");
					};

					$scope.getMyLeavesByCalenderId = function(calendarId) {
						$scope.show = true;
						myLeaveService
								.getMyLeavesByCalendarId($localStorage.loginId,
										calendarId, $scope.page, $scope.size)
								.then(
										function(response) {
											$scope.myLeaveList = response.data;
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
					 */

					$scope.getCalendarYears = function() {
						leavePeriodService.getAllLeavePeriodsList().then(
								function(response) {
									$scope.leavePeriodList = response.data;
								});
					};

					$scope.init = function() {
						$scope.getCalendarYears();
					};

				})