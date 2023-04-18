angular
		.module('srmt')
		.controller(
				"qualificationController",
				function($scope, $state, pimQualificationService,
						personalService, educationLevelService, notify,
						$stateParams, $uibModal,documnetService,uploadService,SweetAlert, toaster) {
					$scope.size = 10;
					$scope.page = 0;
					$scope.person = personalService.getEmployee();
					$scope.inspiniaTemplate = 'views/common/notify.html';
					$scope.qualificationDetails = $stateParams.qualificationData;

					$scope.gotoQualificationDetail = function() {
						$state.go('home.employee.qualificationDeatil');
					};
					$scope.gotoAddQualificationDetail = function() {
						$state.go('home.employee.addQualoification');
					};
					$scope.gotoUpdateQualificationDetail = function(
							thisqualification) {
						$state.go('home.employee.updateQualification', {
							qualificationData : thisqualification
						});
					};
					$scope.gotoViewQualificationDetail = function(
							thisqualification) {
						$state.go('home.employee.viewQulaification', {
							qualificationData : thisqualification
						});
					};

					$scope.getAllQualificationDetails = function() {
						pimQualificationService
								.getQualificationList($scope.person.id)
								.then(

										function(response) {
											$scope.qualificationList = response.data;
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

					$scope.getEducationLevels = function() {
						educationLevelService
								.getAllEducationLevelDetails(0, 50)
								.then(function(response) {
									$scope.educationLevelList = response.data;
								})
					};

					$scope.addEmployeeQualification = function(qualification) {
						pimQualificationService
								.addQualification($scope.person.id,
										qualification)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoQualificationDetail();
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

					$scope.updateEmployeeQualification = function(qualification) {
						pimQualificationService
								.updateQualification($scope.person.id,
										qualification.id, qualification)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoQualificationDetail();
										},
										function(error) {
											$scope.clearupdate();
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										})
					};
					$scope.deleteOpen2 = function(id) {

						SweetAlert
								.swal(
										{
											title : "Are you sure?",
											text : "You want to delete this!",
											type : "warning",
											showCancelButton : true,
											confirmButtonColor : "#DD6B55",
											confirmButtonText : "Yes, delete it!",
											cancelButtonText : "No, cancel",
											closeOnConfirm : false,
											closeOnCancel : false
										},

										function(isConfirm) {
											if (isConfirm) {
												pimQualificationService
												.deleteQualification(
														$scope.person.id, id)
														.then(
																function(
																		response) {
																	SweetAlert
																			.swal(
																					"Deleted!",
																					" deleted successfully",
																					"success");
																	$scope
																			.getAllLanguageProficiencies();
																})
											} else {
												SweetAlert
														.swal(
																"Cancelled",
																"Your information is safe",
																"error");
											}
										});

					}


					
					// ////////////////////////*******to upload
					// documents***********////////////////

					$scope.documentDetail = $stateParams.document;
					console.log($stateParams.document);

					$scope.goToUpdateDocument = function(document) {
						$state.go('home.employee.updateQualificationDocument', {
							document : document
						});
					}
					$scope.goToViewDocument = function(document) {
						$state.go('home.employee.viewQualifictionDocument', {
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
								.addDocumnet($scope.person.id, "Qualification",
										$scope.document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
													$scope.gotoQualificationDetail();
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
								"Qualification").then(function(response) {
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
											notify
													({
														message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
																+ error.data.message
																+ '</h4>',
														positionX : 'center',
														delay : 2000

													})

										})
					}

					$scope.updateDocument = function(document) {
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
													$scope.gotoQualificationDetail();
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