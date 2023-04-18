angular
		.module('srmt')
		.controller(
				"attendanceController",
				function($scope, personalService, attendanceService, notify,
						$filter, uploadService, $state, employeeService,
						$stateParams, personalDetailsSelfService,
						LocationService, locationDepartmentService, toaster,
						$localStorage) {

					
					$scope.attendanceData = $stateParams.attendance;
					console.log($scope.attendanceData);
					$scope.getEmployeeList = function() {
						personalService.getEmployeeList(0, 50).then(
								function(response) {
									$scope.employeeList = response.data;

								})
					}

					$scope.goToUploadAttendance = function() {
						$state.go('home.attendance.uploadAttendance');
					}
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
						$scope.searchAttendanceByEmployeeAndStateAndDate();

					});

					$scope.getCount = function(url) {
						attendanceService.attendanceSearchForAllEmployeesCount(
								url).then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					};

					/**
					 * pagination logic
					 */
					$scope.getAttendanceList = function(date1) {
						date1 = $filter('date')(date1, 'dd-MM-yyyy');
						attendanceService.getAttendanceList(date1).then(
								function(response) {
									console.log("service called");
									$scope.attendanceList = response.data;
								}, function(error) {
									notify({
										message : error.data.message,
										classes : 'alert-info',
										templateUrl : $scope.inspiniaTemplate
									});
								})
					};

					// goto links

					$scope.gotoUpdateAttendance = function(thisattendance) {

						$state.go("home.attendance.updateAttendance", {
							attendance : thisattendance
						});
					};

					$scope.viewAttendance = function(thisattendance) {
						$state.go("home.attendance.viewAttendance", {
							attendance : thisattendance
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
						attendanceService.updateEmpAttendance(attendance.id,
								attendance).then(function(response) {
							toaster.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoAttendanceList();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
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
						uploadService.uploadAttendance(files[0]).success(
								function(response) {
									$scope.document = response;
								}).error(function(error) {
							toaster.pop({
								type : 'error',
								body : error.message,
								showCloseButton : true,
								timeout : 4000
							});
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
												message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
														+ error.data.message
														+ '</h4>',
												classes : 'alert-info',
												templateUrl : $scope.inspiniaTemplate
											});
											$state.go('home.attendanceList');

										},
										function(error) {
											notify({
												message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
														+ error.data.message
														+ '</h4>',
												classes : 'alert-info',
												templateUrl : $scope.inspiniaTemplate
											});
										})
					};
					/* date picker */

					$scope.dateOptions = {
						startingDay : 1
					};
					$scope.clearupdate = function() {
						$scope.attendanceData.date = '';
					};
					$scope.open1 = function() {
						$scope.popup1.opened = true;
					};
					$scope.open2 = function() {
						$scope.popup2.opened = true;
					};
					$scope.popup1 = {
						opened : false
					};
					$scope.popup2 = {
						opened : false
					};

					$scope.getAllActiveEmployees = function() {
						employeeService.getAllActiveEmployeesAndExceptById(
								$localStorage.loginId).then(function(response) {
							$scope.employeeList = response.data;
						}, function(error) {
							console.log(error);
						});
					};

					$scope.searchAttendanceByEmployeeAndStateAndDate = function(
							employeeId, locationId, departmentId, fromDate,
							toDate) {
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
						if (employeeId != undefined) {
							url = url + "employeeId=" + employeeId + "&";
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
						attendanceService.attendanceSearchForAllEmployees(url)
								.then(function(response) {
									$scope.attendanceList = response.data;
									$scope.getCount(CountUrl);
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
						$scope.getAllActiveEmployees();
					};

				});