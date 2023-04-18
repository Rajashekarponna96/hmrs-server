angular
		.module('srmt')
		.controller(
				"terminateController",
				function($scope, $state, uploadService, documnetService,
						personalService, terminateService, $stateParams,
						notify, $filter,toaster) {

					$scope.employee = personalService.getEmployee();
					if ($scope.employee != null)
						if ($scope.employee.terminationDate != null) {
							$scope.employee.terminationDate = $filter('date')(
									$scope.employee.terminationDate,
									'dd-MM-yyyy');
							/*var datef = $scope.employee.terminationDate
									.split('-');
							$scope.employee.terminationDate = new Date(
									datef[2], parseInt(datef[1]) - 1, datef[0]);*/
						}
					$scope.gotoAddTermination = function() {
						$state.go('home.employee.AddTerminateEmployment');
					}

					$scope.gotoAddPersonalDetails = function() {
						$state.go('home.employee.addPersonDetails');
					}
					$scope.addTerminationEmployee = function(employee) {
						employee.terminationDate = $filter('date')(
								employee.terminationDate, 'dd-MM-yyyy');
						employee.dob = $filter('date')(employee.dob,
								'dd-MM-yyyy');
						if (employee.dateOfjoining != null)
							employee.dateOfjoining = $filter('date')(
									employee.dateOfjoining, 'dd-MM-yyyy');
						terminateService
								.addTerminateEmployee(employee.id, employee)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Terminated Successfully',
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
					};

					/* date picker */

					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.open1 = function() {
						$scope.employee.terminationDate = '';
						$scope.popup1.opened = true;
					};

					$scope.popup1 = {
						opened : false
					};
					$scope.clear = function() {
						$scope.employee.terminationDate = '';
					}

					// ////////////////////////*******to upload
					// documents***********////////////////

					$scope.documentDetail = $stateParams.document;
					console.log($stateParams.document);

					$scope.goToUpdateDocument = function(document) {
						$state.go('home.employee.updateTerminateDocument', {
							document : document
						});
					}
					$scope.goToViewDocument = function(document) {
						$state.go('home.employee.viewDocument', {
							document : document
						});
					}

					$scope.document = {};
					$scope.documnetUploads = function(files) {
						uploadService.uploadDocument(files[0]).success(
								function(response) {
									$scope.document = response;

								}).error(function(error) {
							console.log("error");
						});
					};
					// employeeDocuments
					$scope.addDocument = function() {

						$scope.document.name = $scope.fileName;
						console.log("$scope.document" + $scope.document);
						documnetService
								.addDocumnet($scope.person.id, "Termination",
										$scope.document)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoAddTermination();
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
					$scope.getDocumnets = function() {
						documnetService.getDocumnets($scope.person.id,
								"Termination").then(function(response) {
							$scope.documentsList = response.data;
						})

					}

					$scope.deleteDocuments = function(document) {
						documnetService
								.deleteDocuments($scope.person.id, document.id)
								.then(
										function(response) {
											$scope.getDocumnets();
											notify
													({
														message : '<h4><span class="glyphicon glyphicon-ok"></span> Deleted successfully.</h4>',
														positionX : 'center',
														delay : 2000

													})
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
						$scope.document.id=document.id;
						$scope.document.name=document.name;
						documnetService
								.updateDocumnet($scope.person.id, $scope.document.id,
										$scope.document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoAddTermination();
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

				})