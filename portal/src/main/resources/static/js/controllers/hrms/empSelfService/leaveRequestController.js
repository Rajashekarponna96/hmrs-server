angular
		.module('srmt')
		.controller(
				"leaveRequestController",
				function($scope, $state, pimLanguageService, personalService,
						leaveRequestService, notify, $stateParams, $uibModal,
						personalDetailsSelfService, $localStorage, $filter,
						leavePeriodService, leaveTypeService, employeeService,
						$localStorage, toaster, leaveEntitlementService,
						SweetAlert, dateDifferenceService) {

					
					$scope.person = personalDetailsSelfService.getEmployee();

					$scope.gotoLeaveRequestDetail = function() {
						$state.go('home.selfService.leaveDetails');
					}
					$scope.gotoAddLeaveRequest = function() {
						$state.go('home.selfService.addLeaveRequest');
					}

					$scope.applyForLeave = function(leaveRequest) {

						leaveRequest.leaveType = leaveRequest.leaveEntitlement.leaveType;
						/*
						 * leaveRequest.fromDate = $filter('date')(
						 * leaveRequest.fromDate, 'dd-MM-yyyy');
						 * leaveRequest.toDate = $filter('date')(
						 * leaveRequest.toDate, 'dd-MM-yyyy');
						 */
						if ($filter('datepreselect')(leaveRequest.fromDate) > $filter(
								'datepreselect')(leaveRequest.toDate)) {
							toaster
									.pop({
										type : 'error',
										body : 'To-Date must be earlier than From-Date',
										showCloseButton : true,
										timeout : 4000
									});
						} else {
							if ($scope.difference > leaveRequest.leaveEntitlement.balance) {
								toaster
										.pop({
											type : 'error',
											body : 'Number of Days exceeds total available leaves',
											showCloseButton : true,
											timeout : 4000
										});
							} else {
								leaveRequestService.applyForLeave(
										$localStorage.loginId, leaveRequest)
										.then(function(response) {
											toaster.success({

												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});

											$scope.gotoLeaveRequestDetail();
										}, function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										})
							}
						}
					};
					$scope.page = 0;
					$scope.size = 100;
					$scope.getLeaveRequestList = function() {
						leaveRequestService
								.getLeaveRequestList($localStorage.loginId)
								.then(function(response) {
									$scope.leaveRequestList = response.data;

								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});
								})
					};
					$scope.getLeaveEntitleList = function() {
						leaveRequestService.getLeaveEntitleList(
								$localStorage.loginId).then(function(response) {
							$scope.LeaveEntitlementList = response.data;
							console.log($scope.LeaveEntitlementList);
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
					};

					$scope.getAllLeaveTypes = function() {
						leaveTypeService.getAllLeaveTypes().then(
								function(response) {
									$scope.leaveTypeList = response.data;
								})
					}

					/* date picker */

					$scope.clear = function() {
						$scope.holiday.holidayDate = '';
					};
					$scope.clearupdate = function() {
						$scope.holidayDetails.holidayDate = '';
					};
					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.open1 = function() {
						$scope.popup1.opened = true;
					};
					$scope.open2 = function() {
						$scope.popup2.opened = true;
					};
					$scope.open3 = function() {
						$scope.popup3.opened = true;
					};
					$scope.popup1 = {
						opened : false
					};
					$scope.popup2 = {
						opened : false
					};
					$scope.popup3 = {
						opened : false
					};

					$scope.getAllLeaveRequests = function() {
						leaveRequestService.getAllLeaveRequests().then(
								function(response) {
									$scope.leaverequestList = response.data;
								})
					};

					$scope.getAllLeavePeriods = function() {
						leavePeriodService.getAllLeavePeriodsList().then(
								function(response) {
									$scope.leavePeriodList = response.data;
								})
					};

					$scope.getLeaveTypes = function() {
						leaveTypeService.getAllLeaveTypes().then(
								function(response) {
									$scope.leaveTypeList = response.data;
								})
					};

					$scope.getEmployeeList = function() {
						employeeService.getAllActiveEmployeesAndExceptById(
								$localStorage.loginId).then(function(response) {
							$scope.employeeList = response.data;

						});
					};

					$scope.cancelLeaveRequest = function(id) {

						SweetAlert
								.swal(
										{
											title : "Are you sure?",
											text : "You want to Cancel this Leave Request!",
											type : "warning",
											showCancelButton : true,
											confirmButtonColor : "#DD6B55",
											confirmButtonText : "Yes, Cancel!",
											cancelButtonText : "No, cancel",
											closeOnConfirm : false,
											closeOnCancel : false
										},

										function(isConfirm) {
											if (isConfirm) {
												leaveRequestService
														.cancelLeaveRequest(id)
														.then(
																function(
																		response) {
																	SweetAlert
																			.swal(
																					" Cancelled successfully",
																					"success");
																	$scope
																			.getLeaveRequestList();
																})
											} else {
												SweetAlert
														.swal(
																"Cancelled",
																"Your information is safe",
																"error");
											}
										});

					}

					$scope.getLeaveEntitlementsByEmployeeIdAndLeavePeriod = function() {
						leaveEntitlementService
								.getLeaveEntitlementsByEmployeeIdAndLeavePeriod(
										$localStorage.loginId,
										$scope.leavePeriod.id)
								.then(function(response) {
									$scope.leaveEntitlements = response.data;
								})
					};

					$scope.getDifference = function(fromDate, toDate) {
						if (fromDate != null && toDate != null) {
							dateDifferenceService.getDateDifference(fromDate,
									toDate).then(function(response) {
								$scope.difference = response.data;
							}, function(error) {
								$scope.difference = '';
								toaster.pop({
									type : 'error',
									body : 'To Date is Earlier than From Date',
									showCloseButton : true,
									timeout : 4000
								});
							})
						}
					}

				})