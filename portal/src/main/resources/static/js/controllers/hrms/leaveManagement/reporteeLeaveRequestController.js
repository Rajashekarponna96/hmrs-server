angular
		.module('srmt')
		.controller(
				"reporteeLeaveRequestController",
				function($scope, notify, $filter, $uibModal, $state,reporteeLeaveRequestService,
						personalService, $stateParams, leaveRequestService, employeeService, $localStorage ,toaster) {
					$scope.employeeLeaveRequestDetails = $stateParams.empLeaveRequest;
					console.log($scope.employeeLeaveRequestDetails);
					
					
					$scope.gotoEditEmpLeaveRequest = function() {
						$state.go("home.leavemgmt.updateReporteeLeaveRequest");
					};
					$scope.gotoEmployeeLeaveRequestList = function() {
						$state.go("home.leavemgmt.reporteeLeaveRequest");
					};
					$scope.getAllEmployeeRequestsData = function() {
						leaveRequestService.getAllLeaveRequests().then(
								function(response) {
									$scope.AllLeaveRequestList = response.data;
								})
					};

					$scope.gotoUpdateEmployeeLeaveRequest = function(
							LeaveRequest) {

						$state.go("home.leavemgmt.updateReporteeLeaveRequest", {
							empLeaveRequest : LeaveRequest
						});
					};

					

					$scope.updateEmployeeLeaveRequestDetails = function(
							leaveRequest) {
						leaveRequestService
								.updateLeaveRequest(leaveRequest)
								.then(
										function(response) {
											toaster
											.success({
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope
													.gotoEmployeeLeaveRequestList();
										},
										function(error) {

											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										});
					};
					$scope.getEmployeeList = function(){
						employeeService.getAllReporties($localStorage.loginId).then(
								function(response) {
									$scope.employeeList = response.data;

								});
					};
					 
					$scope.page =0;
					$scope.size= 10;
					
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
					$scope.getCount = function(url) {
						reporteeLeaveRequestService.SearchLeaveReporteeLeaveRequestCount($localStorage.loginId,url).then(
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
						$scope.SearchLeaveReporteeLeaveRequest();
						//$scope.searchEmployeeLeaveRequestByEmployeeId();
					});

					/**
					 * pagination logic
					 */

					$scope.SearchLeaveReporteeLeaveRequest = function(employee){
						var url = "?";
						if (employee != undefined && employee!="" ) {
							url = url + "employeeId=" + employee.id + "&";
						}
						var countUrl = url;
						url = url + "page=" + $scope.page + "&size="
						+ $scope.size;
						
						reporteeLeaveRequestService.SearchLeaveReporteeLeaveRequest($localStorage.loginId,url).then(
								function(response) {
									$scope.AllLeaveRequestList = response.data;
									$scope.getCount(countUrl);
						});
					};
				});