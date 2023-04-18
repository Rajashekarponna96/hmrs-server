angular
		.module('srmt')
		.controller(
				'userController',
				function($scope, $state, $stateParams, roleService,$localStorage,
						 $uibModal, $filter, personalService,employeeService ,
						userService,toaster) {
					$scope.userDetail = $stateParams.user;
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
					$scope.getCount = function() {
						userService.getCount().then(
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
						$scope.getUsers();
						$scope.getCount();
					});

					/**
					 * pagination logic
					 */
					
					$scope.getAllActiveAndNotNullUsers=function(){
						employeeService.getAllActiveAndNotNullUsers().then(function(response){
							$scope.activeAndNotNullEmployees=response.data;
						})
					}
					
					$scope.gotoAddUser = function() {
						$state.go('home.usermgmt.addUser');
					};
					$scope.gotoViewUser = function(thisuser) {
						$state.go("home.usermgmt.viewUser",{
							user: thisuser
						});
					};
					$scope.gotoUpdateUser = function(thisuser) {
						$scope.pwd = thisuser.password;
						$state.go('home.usermgmt.updateUser',{
							user: thisuser
						})
					};
					$scope.gotoUserList = function() {
						$state.go('home.usermgmt.userList');
					};
					$scope.getRoles = function() {
						roleService.getRoles().then(function(response) {
							$scope.roleList = response.data;
						})
					};
					$scope.init = function() {
						$scope.getRoles();
						$scope.getAllActiveAndNotNullUsers();
						$scope.user.isActive = true;
					}
					
					$scope.updateUser = function(userDetail) {
						userDetail.password = $scope.newPassword;
						userService
								.updateUser(userDetail)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updted Successfully',
												showCloseButton : true,
												timeout : 4000
											});

													$scope.gotoUserList();
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
					
					$scope.addUser = function() {
						userService
								.addUser($scope.user)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});

													$scope.gotoUserList();
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
						personalService.getAllActiveEmployees().then(
								function(response) {
									$scope.employeeList = response.data;

								})
					};
					$scope.getUsers = function() {
						userService
								.getAllUser($scope.page, $scope.size)
								.then(
										function(response) {
											$scope.userList = response.data;
											$scope.getCount();
										},
										function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});

										})
					}
					$scope.user = {};
					$scope.checkPasswords = function(){
						return $scope.user.confirmPassword==$scope.user.password ? true: false;
					};

				});
