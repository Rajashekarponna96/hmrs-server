angular
		.module('srmt')
		.controller(
				"qualificationDetailsSelfServiceController",
				function($scope, $state, pimQualificationService,
						personalService, educationLevelService, notify,
						$localStorage, $stateParams, $uibModal,
						documnetService, uploadService,
						personalDetailsSelfService, toaster, SweetAlert) {

					
					$scope.size = 10;
					$scope.page = 0;
					$scope.person = personalDetailsSelfService.getEmployee();

					$scope.qualificationDetails = $stateParams.qualificationData;

					$scope.gotoQualificationDetail = function() {
						$state
								.go('home.selfService.myinfo.qualificationDetails');
					};
					$scope.gotoAddQualificationDetail = function() {
						$state.go('home.selfService.myinfo.addQualoification');
					};
					$scope.gotoUpdateQualificationDetail = function(
							thisqualification) {
						$state.go(
								'home.selfService.myinfo.updateQualification',
								{
									qualificationData : thisqualification
								});
					};
					$scope.gotoViewQualificationDetail = function(
							thisqualification) {
						$state.go('home.selfService.myinfo.viewQulaification',
								{
									qualificationData : thisqualification
								});
					};

					$scope.getAllQualificationDetails = function() {
						pimQualificationService.getQualificationList(
								$localStorage.loginId).then(

						function(response) {
							$scope.qualificationList = response.data;
						}, function(error) {
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
						pimQualificationService.addQualification(
								$localStorage.loginId, qualification).then(
								function(response) {
									toaster.success({

										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoQualificationDetail();
								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});
								})
					};

					$scope.updateEmployeeQualification = function(qualification) {
						pimQualificationService.updateQualification(
								$localStorage.loginId, qualification.id,
								qualification).then(function(response) {
							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoQualificationDetail();
						}, function(error) {
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
																$scope.person.id,
																id)
														.then(
																function(
																		response) {
																	SweetAlert
																			.swal(
																					"Deleted!",
																					" deleted successfully",
																					"success");
																	$scope
																			.getAllQualificationDetails();
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
						$state
								.go(
										'home.selfService.myinfo.updateQualificationDocument',
										{
											document : document
										});
					}
					$scope.goToViewDocument = function(document) {
						$state
								.go(
										'home.selfService.myinfo.viewQualificationDocument',
										{
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
						documnetService.addDocumnet($localStorage.loginId,
								"Qualification", $scope.document).then(
								function(response) {

									toaster.success({

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
						documnetService.getDocumnets($localStorage.loginId,
								"Qualification").then(function(response) {
							$scope.documentsList = response.data;
						})

					}

					$scope.deleteDocuments = function(document) {
						documnetService.deleteDocuments($localStorage.loginId,
								document.id).then(function(response) {
							$scope.getDocumnets();
							toaster.success({

								body : 'Added Successfully',
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
						documnetService.updateDocumnet($localStorage.loginId,
								document.id, document).then(function(response) {

							toaster.success({

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
					$scope.docPath = function(path) {
						var imagepath = uploadService.imagePath(path);
						return imagepath;
					};

				})