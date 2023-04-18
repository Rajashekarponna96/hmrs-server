angular
		.module('srmt')
		.controller(
				"functionHallController",
				function($scope, $state, toaster, $stateParams,
						countryService, $stateParams, functionHallService,
						employeeService, $localStorage) {
					$scope.init = function() {
						$scope.getFunctionHallsList();
					};
					
					
					$scope.gotoAddFunctionHall = function() {
						$state.go('home.crm.addFunctionHall');
					};

					$scope.gotoFunctionHallList = function() {
						$state.go("home.crm.functionHallList");
					};

					$scope.functionHallDetail = $stateParams.functionHall;

					// $scope.functionHallDetail.contactPerson=contactPerson;

					$scope.gotoUpdateFunctionHall = function(functionHall) {
						/*var contactPerson = {
							fisrtName : functionHall.contactPerson.fisrtName,
							middleName : functionHall.contactPerson.middleName,
							lastName : functionHall.contactPerson.lastName,
							mobile : functionHall.contactPerson.mobile,
							homePhone : functionHall.contactPerson.homePhone

						}
						functionHall.contactPerson = contactPerson;*/
						$state.go("home.crm.updateFunctionHall", {

							functionHall : functionHall
						});
					};

					$scope.gotoviewFunctionHall = function(functionHall) {
						$state.go("home.crm.viewFunctionHall", {
							functionHall : functionHall
						});
					};

					$scope.addFunctionHall = function(functionHall) {
						functionHallService
								.addFunctionHall(functionHall)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoFunctionHallList();
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

					$scope.updateFunctionHall = function(functionHall) {
						functionHallService
								.updateFunctionHall(functionHall.id,
										functionHall)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoFunctionHallList();
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
					$scope.getEmployeeList = function() {
						employeeService.getAllActiveEmployeesAndExceptById(
								$localStorage.loginId).then(function(response) {
							$scope.employeeList = response.data;

						});
					};

					
					$scope.page = 0;
					$scope.size = 10;
					$scope.getFunctionHallsList = function() {
						functionHallService.getFunctionHallsList($scope.page,
								$scope.size).then(function(response) {
							$scope.functionHallsList = response.data;
						})
					}

				})