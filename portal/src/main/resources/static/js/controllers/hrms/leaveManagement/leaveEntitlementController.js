angular
		.module('srmt')
		.controller(
				"leaveEntitlementController",
				function($scope, leaveTypeService, leavePeriodService,
						$localStorage, personalService,
						leaveEntitlementService, notify, $filter, $uibModal,
						$state, $stateParams, LocationService, toaster,
						locationDepartmentService) {
					$scope.page = 0;
					$scope.size = 10;

					
					$scope.leaveEntitlementDetails = $stateParams.leaveEntitlement;
					console.log($scope.leaveEntitlementDetails);
					if ($scope.leaveEntitlementDetails != undefined) {
						$scope.fullPeriod = $scope.leaveEntitlementDetails.leavePeriod.startDate
								+ " To "
								+ $scope.leaveEntitlementDetails.leavePeriod.endDate;
					}

					$scope.gotoAddLeaveEntitlement = function() {
						$state.go("home.leavemgmt.addLeaveEntitlement");
					};

					$scope.gotoLeaveEntitlementList = function() {
						$state.go("home.leavemgmt.leaveEntitlementList");
					};

					$scope.addLeaveEntitlement = function(leaveEntitlement) {

						var url = "/";
						if ($scope.leaveEntitlement.employee != undefined) {
							url = "empoyee/"
									+ $scope.leaveEntitlement.employee.id;
						}
						if ($scope.leaveEntitlement.allEmployees != undefined) {
							url = "all";
						}
						if ($scope.leaveEntitlement.employee == undefined
								&& $scope.leaveEntitlement.location != undefined
								&& $scope.leaveEntitlement.department == undefined) {
							url = "location/"
									+ $scope.leaveEntitlement.location.id;
						}
						if ($scope.leaveEntitlement.location != undefined
								&& $scope.leaveEntitlement.department != undefined) {
							url = "department/"
									+ $scope.leaveEntitlement.department.id;
						}
						leaveEntitlement.balance = leaveEntitlement.days;
						leaveEntitlementService.addLeaveEntitlement(url,
								leaveEntitlement).then(function(response) {
							toaster.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});

							$scope.gotoLeaveEntitlementList();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});

						})

					};

					$scope.init = function() {
						$scope.getEmployeeList();
						$scope.getAllLeavePeriods();
						$scope.getAllLeaveTypes();
					};

					$scope.getEmployeeList = function() {
						personalService.getAllActiveEmployees().then(
								function(response) {
									$scope.employeeList = response.data;

								})
					};
					$scope.getAllLeavePeriods = function() {
						leavePeriodService.getAllLeavePeriodsList().then(
								function(response) {
									$scope.leavePeriodList = response.data;
								})
					};
					$scope.getAllLeaveTypes = function() {
						leaveTypeService.getAllLeaveTypes().then(
								function(response) {
									$scope.leaveTypeList = response.data;
								})
					};

					$scope.getLeaveEntitlementList = function() {
						leaveEntitlementService
								.getLeaveEntitlementList($scope.page,
										$scope.size)
								.then(
										function(response) {
											$scope.leaveEntitlementList = response.data;
										})
					};

					$scope.gotoUpdateLeaveEntitlement = function(
							thisleaveEntitlement) {
						$state.go("home.leavemgmt.updateLeaveEntitlement", {
							leaveEntitlement : thisleaveEntitlement
						});
					};

					$scope.updateLeaveEntitlement = function(leaveEntitlement) {
						leaveEntitlement.employee = $scope.leaveEntitlementDetails.employee;
						console.log(leaveEntitlement);
						leaveEntitlementService.updateLeaveEntitlement(
								leaveEntitlement.id, leaveEntitlement).then(
								function(response) {
									toaster.success({
										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});

									$scope.gotoLeaveEntitlementList();
								}, function(error) {

									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});

								});
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
						leaveEntitlementService.SearchLeaveEntitlementsCount(
								countUrl).then(
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
						$scope.SearchLeaveEntitlements();
					});

					/**
					 * pagination logic
					 */

					/*
					 * $scope.deleteOpen = function(id) { $scope.delId = id; var
					 * modalInstance = $uibModal.open({
					 * 
					 * templateUrl : 'myModalContent.html', controller :
					 * 'ModalInstanceCtrl',
					 * 
					 * });
					 * 
					 * modalInstance.result .then( function() {
					 * leaveEntitlementService .deleteLeaveEntitlement(id)
					 * .then( function(response) { Notification .error({ message : '<h4><span
					 * class="glyphicon glyphicon-trash"></span> Leave
					 * Entitlement deleted successfully.</h4>', positionX :
					 * 'center', delay : 2000 }); $scope
					 * .getLeaveEntitlementList(); }, function(error) {
					 * Notification .error({ message : '<span class="glyphicon
					 * glyphicon-remove-circle"></span>' + error.data.message,
					 * positionX : 'center', delay : 2000 }); }) }); };
					 */
					$scope.viewLeaveEntitlement = function(thisleaveEntitlement) {
						$state.go("home.leavemgmt.viewLeaveEntitlement", {
							leaveEntitlement : thisleaveEntitlement
						});
					};
					$scope.getAllLocations = function() {
						LocationService.getAlltLocations().then(
								function(response) {
									$scope.locationList = response.data;
								});
					};

					$scope.getDepartments = function(id) {
						if (id != undefined)
							locationDepartmentService
									.getAllLocationDepartments(id)
									.then(function(response) {
										$scope.departmentList = response.data;
									});
					};

					$scope.reset = function() {
						$scope.leaveEntitlement = "";
					}
					$scope.resetSearch = function() {
						$scope.leavePeriod = undefined;
						$scope.leaveType = undefined;
						$scope.employee = undefined;
					}

					$scope.SearchLeaveEntitlements = function() {
						var url = "?"
						if ($scope.leavePeriod != undefined) {
							url = url + "leavePeriodId="
									+ $scope.leavePeriod.id + "&";
						}
						if ($scope.leaveType != undefined) {
							url = url + "leaveTypeId=" + $scope.leaveType.id
									+ "&";
						}

						if ($scope.employee != undefined) {
							url = url + "employeeId=" + $scope.employee.id
									+ "&";
						}
						var countUrl = url;
						dataurl = url + "page=" + $scope.page + "&size="
								+ $scope.size;
						leaveEntitlementService
								.SearchLeaveEntitlements(dataurl)
								.then(
										function(response) {
											$scope.leaveEntitlementList = response.data;
											$scope.getCount(countUrl);
											$scope.resetSearch();
										})
					}

				});