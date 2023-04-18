angular
		.module('srmt')
		.controller(
				"personalDetailsSelfServiceController",
				function($scope, personalDetailsSelfService, notify, $filter,
						$uibModal, $state, $stateParams, $localStorage,
						uploadService, documnetService,toaster) {
					
					
//					console.log($localStorage.loginId);

					$scope.goTopersonaldetailsFirst = function() {
						$state.go('home.selfService.myinfo.updatePersonalDetail');
					}

					$scope.getEmployeeById = function() {
						personalDetailsSelfService.getEmployeeById(
								$localStorage.loginId).then(
								function(response) {
									$scope.person = response.data;
//									console.log($scope.person);
									personalDetailsSelfService
											.setEmployeee(response.data);
									$scope.getDocumnets();
									if ($scope.person != null) {
										if ($scope.person.dob != null) {
											$scope.person.dob = $filter('date')
													($scope.person.dob,
															'dd-MM-yyyy');
											/*var datef = $scope.person.dob
													.split('-');
											$scope.person.dob = new Date(
													datef[2],
													parseInt(datef[1]) - 1,
													datef[0]);*/
										}
									}
								});
					}

					$scope.updatePerson = function(person) {
						person.dob = $filter('date')(person.dob, 'dd-MM-yyyy');
						if (person.terminationDate != null)
							person.terminationDate = $filter('date')(
									person.terminationDate, 'dd-MM-yyyy');
						if (person.dateOfjoining != null)
							person.dateOfjoining = $filter('date')(
									person.dateOfjoining, 'dd-MM-yyyy');
//						console.log($scope.document);
						person.photoPath = $scope.document.imagepath;
						personalDetailsSelfService
								.updatePerson(person.id, person)
								.then(
										function(response) {
											/*var datef = person.dob.split('-');
											person.dob = new Date(datef[2],
													parseInt(datef[1]) - 1,
													datef[0]);*/
											toaster
											.success({
											
												body : 'Saved Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.imagePath();
//											console
//													.log("after update response object"
//															+ response.data);

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
					// ////////////////////////*******to upload
					// documents***********////////////////

					$scope.person = personalDetailsSelfService.getEmployee();
					$scope.documentDetail = $stateParams.document;
//					console.log($stateParams.document);

					$scope.goToUpdateDocument = function(document) {
						$state.go('home.selfService.myinfo.updateDocument', {
							document : document
						});
					}
					$scope.goToViewDocument = function(document) {
						$state.go('home.selfService.myinfo.viewDocument', {
							document : document
						});
					}

					$scope.document = {};
					$scope.documnetUploads = function(files) {
						uploadService.uploadDocument(files[0]).success(
								function(response) {
									$scope.document = response;
//									console.log($scope.imagePath);

								}).error(function(error) {
//							console.log("error");
						});
					};
					// employeeDocuments
					$scope.addDocument = function() {

						$scope.document.name = $scope.fileName;
//						console.log("$scope.document" + $scope.document);
						documnetService
								.addDocumnet($localStorage.loginId, "Employee",
										$scope.document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Uploaded Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.goTopersonaldetailsFirst();
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

					$scope.person = personalDetailsSelfService.getEmployee();
					$scope.getDocumnets = function() {

						documnetService.getDocumnets($localStorage.loginId,
								"Employee").then(function(response) {
							$scope.documentsList = response.data;
						})

					}

					$scope.deleteDocuments = function(document) {
						documnetService
								.deleteDocuments($localStorage.loginId,
										document.id)
								.then(
										function(response) {
											$scope.getDocumnets();
											toaster
											.success({
											
												body : 'Deleted Successfully',
												showCloseButton : true,
												timeout : 4000
											});
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

					$scope.updateDocumnet = function(document) {
						documnetService
								.updateDocumnet($localStorage.loginId,
										document.id, document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Uploaded Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.goTopersonaldetailsFirst();
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

					/* date picker */

					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.open1 = function() {
						$scope.person.dob = '';
						$scope.popup1.opened = true;
					};

					$scope.popup1 = {
						opened : false
					};
					$scope.clear = function() {
						$scope.person.dob = '';
					}
					// /******set status

					$scope.setStatus = function() {
						personalService
								.setStatus($localStorage.loginId)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotopersonaldetail();
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
					$scope.docPath = function(path) {
						var imagepath = uploadService.imagePath(path);
						return imagepath;
					};

				});