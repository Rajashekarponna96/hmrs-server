angular
		.module('srmt')
		.controller(
				"reporteeAttendanceController",
				function($scope, personalService, attendanceService, notify,
						$filter, uploadService, $state, employeeService,toaster,
						$stateParams, personalDetailsSelfService,
						LocationService, locationDepartmentService,
						$localStorage) {

					
					$scope.goToUploadAttendance = function() {
						$state.go('home.attendance.uploadAttendance');
					}
					$scope.attendanceData = $stateParams.attendance;
					$scope.getEmployeeList = function() {
						personalService.getEmployeeList(0, 50).then(
								function(response) {
									$scope.employeeList = response.data;

								})
					};

					$scope.gotoReporteeAttendanceList = function() {
						$state.go('home.attendance.reporteeAttendance');
					};

					$scope.page = 0;
					$scope.size = 10;

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
						$scope.searchAttendanceByReporteeAndStateAndDate();
					});

					$scope.getCount = function(superiorId, url) {
						attendanceService.attendanceSearchForAllreporteesCount(
								superiorId, url).then(
								function(response) {
									$scope.count = response.data;
									
								});
					};

					/**
					 * pagination logic
					 */
				

					$scope.gotoUpdateReporteeAttendance = function(
							thisattendance) {
						
						$state.go("home.attendance.updateReporteeAttendance", {
							attendance : thisattendance
						});
					};

					$scope.viewAttendance = function(thisattendance) {
						$state.go("home.attendance.viewReporteeAttendance", {
							reporteeAttendance : thisattendance
						});
					};

					$scope.updateEmpAttendance = function(attendance) {
						if (attendance.timeIn.indexOf(":") == -1)
							attendance.timeIn = $filter('time')(
									attendance.timeIn);
						if (attendance.timeout.indexOf(":") == -1)
							attendance.timeout = $filter('time')(
									attendance.timeout);

						attendance.timeout += ":00";
						attendance.timeIn += ":00";
						attendance.date = $filter('date')(attendance.date,
								'dd-MM-yyyy');
						attendanceService
								.updateEmpAttendance(attendance.id, attendance)
								.then(
										function(response) {
											notify({
												   message : '<h4><span class="glyphicon glyphicon-ok"></span> Holiday added successfully.</h4>',
												   classes : 'alert-info',
												   templateUrl : $scope.inspiniaTemplate
												  });
											$scope.gotoAttendanceList();
										},
										function(error) {
											$scope.clearupdate();
											notify({
												   message : '<h4><span class="glyphicon glyphicon-ok"></span> Holiday added successfully.</h4>',
												   classes : 'alert-info',
												   templateUrl : $scope.inspiniaTemplate
												  });
										})
					}
					/* date picker */

					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.open1 = function() {
						$scope.popup1.opened = true;
					};

					$scope.popup1 = {
						opened : false
					};
					$scope.document = {};
					$scope.documnetUploads = function(files) {
						uploadService.uploadDocument(files[0]).success(
								function(response) {
									$scope.document = response;
								}).error(function(error) {
							console.log("error");
						});
					};
					$scope.gotoUploadDocuments = function() {
						$state.go('home.attendance.uploadAttendance');
					};
					$scope.gotoAttendanceList = function() {
						$state.go('home.attendance.attendanceList');
					};
					$scope.uploadAttendance = function() {

						attendanceService
								.uploadAttendance($scope.document)
								.then(
										function(response) {
											notify({
												   message : '<h4><span class="glyphicon glyphicon-ok"></span> Holiday added successfully.</h4>',
												   classes : 'alert-info',
												   templateUrl : $scope.inspiniaTemplate
												  });
											$state.go('home.attendanceList');

										},
										function(error) {
											notify({
												   message : '<h4><span class="glyphicon glyphicon-ok"></span> Holiday added successfully.</h4>',
												   classes : 'alert-info',
												   templateUrl : $scope.inspiniaTemplate
												  });
										})
					};
					
					$scope.getReporties = function() {
						employeeService.getAllReporties($localStorage.loginId)
								.then(function(response) {
									$scope.employeeList = response.data;
								}, function(error) {
									console.log(error);
								});
					};
					$scope.getAllLocation = function() {
						LocationService.getAlltLocations().then(
								function(reponse) {
									$scope.locationList = response.data;
								}, function(error) {
									console.log(error);
								})
					};
					$scope.findDepartmentsByLocationId = function(locationId) {
						departmentService.getDepartmentsByLocation(locationId)
								.then(function() {
									$scope.departmentList = response.data;
								}, function(error) {
									console.log(error);
								})
					};

					$scope.searchAttendanceByReporteeAndStateAndDate = function(
							reporteeId, locationId, departmentId, fromDate,
							toDate) {
						
						$scope.attendanceDetails=[];
						fromDate = $filter("date")(fromDate, "dd-MM-yyyy");
						toDate = $filter("date")(toDate, "dd-MM-yyyy");
						if (fromDate > toDate) {
							toaster
									.pop({
										type : 'error',
										body : 'To-Date must be Greater than From-Date',
										showCloseButton : true,
										timeout : 4000
									});
						}
						var url = "?";
						if (reporteeId != undefined) {
							url = url + "employeeId=" + reporteeId + "&";
						}
						if (locationId != undefined) {
							url = url + "locationId=" + locationId + "&";
						}
						if (departmentId != undefined) {
							url = url + "departmentId=" + departmentId + "&";
						}
						if (fromDate != undefined && toDate != undefined) {
							url = url + "fromDate=" + fromDate + "&";
							url = url + "toDate=" + toDate + "&";

						}
						var CountUrl = url;

						url = url + "page=" + $scope.page + "&size="
								+ $scope.size;
						attendanceService.attendanceSearchForAllReportees(
								$localStorage.loginId, url).then(
								function(response) {
									$scope.attendanceDetails = response.data;
									$scope.getCount($localStorage.loginId,
											CountUrl);
								});

					};

					$scope.getLocations = function() {
						LocationService.getAlltLocations().then(
								function(response) {
									$scope.locationList = response.data;
								})
					};
					$scope.getDepartments = function(id) {
						locationDepartmentService.getAllLocationDepartments(id)
								.then(function(response) {
									$scope.departmentList = response.data;
								});
					};
					$scope.init = function() {
						$scope.getLocations();
						$scope.getReporties();
					};
					$scope.updateReporteeAttendance = function(attendance) {
						if (attendance.timeIn.indexOf(":") == -1)
							attendance.timeIn = $filter('time')(
									attendance.timeIn);
						if (attendance.timeout.indexOf(":") == -1)
							attendance.timeout = $filter('time')(
									attendance.timeout);

						attendance.timeout += ":00";
						attendance.timeIn += ":00";
						attendance.date = $filter('date')(attendance.date,
								'dd-MM-yyyy');
						attendanceService
								.updateEmpAttendance(attendance.id, attendance)
								.then(
										function(response) {
											notify({
												   message : '<h4><span class="glyphicon glyphicon-ok"></span> Holiday added successfully.</h4>',
												   classes : 'alert-info',
												   templateUrl : $scope.inspiniaTemplate
												  });
											$scope.gotoReporteeAttendanceList();
										},
										function(error) {
											$scope.clearupdate();
											notify({
												   message : '<h4><span class="glyphicon glyphicon-ok"></span> Holiday added successfully.</h4>',
												   classes : 'alert-info',
												   templateUrl : $scope.inspiniaTemplate
												  });
										})
					};
				});