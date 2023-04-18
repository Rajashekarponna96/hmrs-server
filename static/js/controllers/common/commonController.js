angular.module('srmt')
		.controller(
				"commonController",
				function($scope, $state, educationLevelService, $stateParams,
						$uibModal, $localStorage, uploadService,
						personalDetailsSelfService, Idle, notify, $rootScope,
						$location) {
					Idle.watch();

					$scope.featureActionList = $localStorage.featureActionList;

					$scope.hasFeatureWithAction = function(name) {
						var feature = undefined;

						var found = false;
						angular.forEach($scope.featureActionList, function(
								featureAction) {

							if (featureAction.feature.name == name) {
								feature = featureAction;
							}
						});
						return feature;

					};
					$scope.$on('IdleStart', function() {
						$scope.doLogout();

					});

					$scope.userName = $localStorage.userName;
					$scope.doLogout = function() {
						delete $localStorage.usrCredentials;
						delete $localStorage.loginId;
						delete $localStorage.features;
						delete $localStorage.featureActionList;
						delete $localStorage.userName;
						$localStorage.$save();
						console.log("logged out");
						$state.go("login");

					};

					personalDetailsSelfService.getEmployeeById(
							$localStorage.loginId).then(function(response) {
						$scope.person = response.data;
						if($scope.person.designatin!=null)
						$scope.designation = $scope.person.designatin.name;
						console.log($scope.designation);
						$scope.employeeName = $scope.person.fisrtName;
					});

					$scope.imagePath = function() {
						if ($scope.person != undefined) {
							var imagepath = uploadService
									.imagePath($scope.person.photoPath);
						}
						if ($scope.person == undefined) {
							var imagepath = "dist/img/avatar2.png";
						}

						return imagepath;

					}

				});