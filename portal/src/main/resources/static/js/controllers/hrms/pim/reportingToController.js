angular
		.module('srmt')
		.controller(
				"reportingToController",
				function($scope, $state, $stateParams, personalService,
						reportingService, notify, $filter, employeeService,
						$localStorage,toaster) {

					$scope.employee = personalService.getEmployee();
					console.log($scope.employee);
					$scope.person = reportingService
							.getPerson($scope.employee.id);
					// $scope.getEmployeeList();
					$scope.gotoReportingToDetail = function() {
						$state.go('home.employee.reportingTo');
					};
					$scope.getEmployeeList = function() {
						employeeService.getAllActiveEmployeesAndExceptById(
								$scope.employee.id).then(function(response) {
							$scope.employeeList = response.data;
						}, function(error) {
							console.log(error);
						});

					};
					$scope.getSuperior = function() {
						employeeService.getSuperior($scope.employee.id).then(
								function(response) {
									$scope.employee.superior = response.data;
								}, function(error) {
									console.log(error);
								});

					};
					$scope.addReportingTo = function(employee) {
						// employee.superior.id=$scope.superiorId;
						employee.dob = $filter('date')(employee.dob,
								'dd-MM-yyyy');
						if (employee.terminationDate != null)
							employee.terminationDate = $filter('date')(
									employee.terminationDate, 'dd-MM-yyyy');
						if (employee.dateOfjoining != null)
							employee.dateOfjoining = $filter('date')(
									employee.dateOfjoining, 'dd-MM-yyyy');

						reportingService
								.addReportingTo(employee.id, employee)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Saved Successfully',
												showCloseButton : true,
												timeout : 4000
											});
										})
					}
				});