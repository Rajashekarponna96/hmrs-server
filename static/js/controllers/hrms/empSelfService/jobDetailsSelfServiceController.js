angular
		.module('srmt')
		.controller(
				"jobDetailsSelfServiceController",
				function($scope, $state, jobDetailService, personalService,
						$localStorage, LocationService, locationDepartmentService,
						designationService, employmentTypeService,
						notify, $filter, personalDetailsSelfService,toaster) {
					
					
					personalDetailsSelfService.getEmployeeById(
							$localStorage.loginId).then(
							function(response) {
								$scope.person = response.data;
								if ($scope.person.department != undefined) {
									$scope.searchLookups();
								}

								if ($scope.person.dateOfjoining != null) {
									$scope.person.dateOfjoining = $filter(
											'date')(
											$scope.person.dateOfjoining,
											'dd-MM-yyyy');
									/*var datef = $scope.person.dateOfjoining
											.split('-');
									$scope.person.dateOfjoining = new Date(
											datef[2], parseInt(datef[1]) - 1,
											datef[0]);*/
								}
								if ($scope.person != null) {
									if ($scope.person.dob != null) {
										$scope.person.dob = $filter('date')
												($scope.person.dob,
														'dd-MM-yyyy');
										var datef = $scope.person.dob
												.split('-');
										$scope.person.dob = new Date(datef[2],
												parseInt(datef[1]) - 1,
												datef[0]);
									}
								}
							});

					$scope.getAlltLocations = function() {
						LocationService.getAlltLocations().then(
								function(response) {
									$scope.locationList = response.data;
								})
					}
					$scope.getDepartmentsByLocation = function(locationId) {
						locationDepartmentService.getAllLocationDepartments(locationId)
								.then(function(response) {
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
						$scope
								.getDepartmentsByLocation($scope.person.department.location.id);
						$scope.getDesignations();
						$scope.getAllEmploymentTypes();
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
						jobDetailService
								.addJobDetail($localStorage.loginId, jobDetail)
								.then(
										function(response) {
											var datef = jobDetail.dateOfjoining
													.split('-');
											jobDetail.dateOfjoining = new Date(
													datef[2],
													parseInt(datef[1]) - 1,
													datef[0]);
											toaster
											.success({
											
												body : 'Saved Successfully',
												showCloseButton : true,
												timeout : 4000
											});
										},
										function(error) {
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