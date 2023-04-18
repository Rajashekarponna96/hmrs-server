angular
		.module('srmt')
		.controller(
				"jobController",
				function($scope, $state, jobDetailService, personalService,
						LocationService, designationService,
						employmentTypeService, notify, $filter,
						locationDepartmentService,toaster) {

					$scope.getAlltLocations = function() {
						LocationService.getAlltLocations().then(
								function(response) {
									$scope.locationList = response.data;
								})
					}
					$scope.getDepartmentsByLocation = function(locationId) {
						locationDepartmentService.getAllLocationDepartments(
								locationId).then(function(response) {
							$scope.departmentList = response.data;

						});
					}

					$scope.getDesignations = function() {
						designationService.getDesignations().then(
								function(response) {
									$scope.designationList = response.data;

								});
					}

					$scope.getAllEmploymentTypes = function() {
						employmentTypeService.getAllEmploymentTypes().then(
								function(response) {
									$scope.employmentTypeList = response.data;

								});
					}

					$scope.searchLookups = function() {
						if ($scope.person.department.location != null) {
							$scope
									.getDepartmentsByLocation($scope.person.department.location.id);
							$scope.getDesignations();
							$scope.getAllEmploymentTypes();
						}

					}
					$scope.person = personalService.getEmployee();

					if ($scope.person.department != undefined) {
						$scope.searchLookups();
					}
					$scope.gotoDependentDetail = function() {
						$state.go('home.employee.TerminateEmploymentDetails');
					}

					$scope.addJobDetail = function(jobDetail) {
						jobDetail.dateOfjoining = $filter('date')(
								jobDetail.dateOfjoining, 'dd-MM-yyyy');
						$scope.person.dob = $filter('date')($scope.person.dob,
								'dd-MM-yyyy');
						if ($scope.person.terminateDate != null)
							$scope.person.terminateDate = $filter('date')(
									$scope.person.terminateDate, 'dd-MM-yyyy');
						jobDetailService.addJobDetail($scope.person.id,
								jobDetail).then(function(response) {
							toaster.success({

								body : 'Saved Successfully',
								showCloseButton : true,
								timeout : 4000
							});

						}, function(error) {
							$scope.clear();
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
						$scope.person.dateOfjoining = '';
						$scope.popup1.opened = true;
					};

					$scope.popup1 = {
						opened : false
					};
					$scope.clear = function() {
						$scope.person.dateOfjoining = '';
					}

				})