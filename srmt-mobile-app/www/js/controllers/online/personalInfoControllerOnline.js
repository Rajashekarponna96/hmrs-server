angular
		.module('srmt')
		.controller(
				"personalInfoControllerOnline",
				function($scope, onlinePersonalInfoService,
						employeeServiceOffline, $state, onlineUploadService,
						$localStorage, $cordovaNetwork) {

					$scope.goBack = function() {
						$state.go('app.dashboard');
					};

					$scope.goToInventoryList = function() {
						$state.go('app.inventory');
					};

					$scope.imagePath = function() {
						if ($scope.salesRepresentative != undefined) {
							console.log($scope.salesRepresentative.photoPath);
							var imagepath = onlineUploadService
									.imagePath($scope.salesRepresentative.photoPath);
						}
						if ($scope.salesRepresentative == undefined) {
							var imagepath = "img/clients.png";
						}

						return imagepath;

					};
					$scope.postDataIntoPouchDb = function(employee) {
						console.log("insert into pouchDb before");

						employeeServiceOffline
								.deleteDb()
								.then(
										function(response) {
											employeeServiceOffline
													.put(employee)
													.then(
															function(response) {
																console
																		.log("insert into pouchDb sucesss");
																$scope
																		.getDataFromPouchDb();
															});
										});

					};
					$scope.getDataFromPouchDb = function() {
						console.log("get data frompouch db");

						employeeServiceOffline
								.getAllDocs()
								.then(
										function(response) {
											alert("get data frompouch db row.doc :"
													+ response.rows[0].doc);
											if (response.rows.length > 0) {
												$scope.salesRepresentative = response.rows[0].doc;
												alert("json :"
														+ $scope.salesRepresentative);
											}
										});
					};
					$scope.init = function() {
						/*
						 * if ($cordovaNetwork != undefined &&
						 * $cordovaNetwork.isOffline()) {
						 * console.log("offline"); $scope.getDataFromPouchDb();
						 *  } else {
						 */
						console.log("online");
						onlinePersonalInfoService.getSalesRepresentative(
								$localStorage.loginId).then(function(response) {
							console.log("onlinemlogin success");
							$scope.salesRepresentative = response.data;
							// $scope.postDataIntoPouchDb(response.data);
						});
						// }
					};
				})