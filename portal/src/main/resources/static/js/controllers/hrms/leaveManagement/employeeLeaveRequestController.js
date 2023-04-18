angular
		.module('srmt')
		.controller(
				"employeeLeaveRequestController",
				function($scope, notify, $filter, $uibModal, $state,
						personalService, $stateParams, leaveRequestService, employeeService, $localStorage,toaster ) {
					$scope.employeeLeaveRequestDetails = $stateParams.empLeaveRequest;
					
					
					
					$scope.gotoEditEmpLeaveRequest = function() {
						$state.go("home.leavemgmt.addEmployeeLeaveRequest");
					};
					$scope.gotoEmployeeLeaveRequestList = function() {
						$state.go("home.leavemgmt.employeeLeaveRequestList");
					};
					$scope.getAllLeaveRequestsByPageAndSize = function() {
						leaveRequestService.getAllLeaveRequestsByPageAndSize($scope.page,$scope.size).then(
								function(response) {
									$scope.AllLeaveRequestList = response.data;
								})
					};

					$scope.gotoUpdateEmployeeLeaveRequest = function(
							thisleaveRequest) {

						$state.go("home.leavemgmt.updateEmployeeLeaveRequest", {
							empLeaveRequest : thisleaveRequest
						});
					};

					$scope.init = function() {
						personalService.getAllActiveEmployees().then(
								function(response) {
									$scope.employeeList = response.data;

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
						employeeService.getAllActiveEmployeesAndExceptById($localStorage.loginId).then(
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
						leaveRequestService.getCount(url).then(
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
						//$scope.getAllEmployeeRequestsData();
						$scope.searchEmployeeLeaveRequestByEmployeeId();
					});

					/**
					 * pagination logic
					 */
					

					$scope.searchEmployeeLeaveRequestByEmployeeId = function(){
						var url = "?";
						if ($scope.employee != undefined && $scope.employee!="" ) {
							url = url + "employeeId=" + $scope.employee.id + "&";
						}
						var countUrl = url;
						url = url + "page=" + $scope.page + "&size="
						+ $scope.size;
						
						leaveRequestService.searchByEmployeeId(url).then(
								function(response) {
									console.log(url+"  s  "+response.entries);
									$scope.AllLeaveRequestList = response.data;
									$scope.getCount(countUrl);
									console.log($scope.count);
						});
					};
				});