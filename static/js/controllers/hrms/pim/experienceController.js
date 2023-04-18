angular
		.module('srmt')
		.controller(
				"experienceController",
				function($scope, $state, $stateParams, $filter,
						pimExperienceService, notify, $uibModal,
						personalService, documnetService, uploadService,
						toaster) {

					$scope.experienceDetails = $stateParams.experienceData;
					$scope.person = personalService.getEmployee();
					$scope.gotoExperienceDetail = function() {
						$state.go('home.employee.experienceDetail');
					}
					$scope.gotoAddExperienceDetail = function() {
						$state.go('home.employee.addExperience');
					}
					$scope.gotoUpdateExperience = function(thisexperience) {
						$state.go('home.employee.updateExperience', {
							experienceData : thisexperience
						});
					}
					$scope.gotoViewExperienceDetail = function() {
						$state.go('home.employee.viewExperience');
					};

					$scope.getAllExperience = function() {
						pimExperienceService.getAllExperience($scope.person.id)
								.then(function(response) {
									$scope.experienceList = response.data;
								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});

								})
					};

					$scope.addExperience = function(experience) {
						experience.fromDate = $filter('date')(
								experience.fromDate, 'dd-MM-yyyy');
						experience.toDate = $filter('date')(experience.toDate,
								'dd-MM-yyyy');
						pimExperienceService.addExperience($scope.person.id,
								experience).then(function(response) {
							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});

							$scope.gotoExperienceDetail();
						}, function(error) {
							$scope.clear();
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});

						})
					};

					$scope.updateExperience = function(experience) {
						experience.fromDate = $filter('date')(
								experience.fromDate, 'dd-MM-yyyy');
						experience.toDate = $filter('date')(experience.toDate,
								'dd-MM-yyyy');
						pimExperienceService.updateExperience($scope.person.id,
								experience.id, experience).then(
								function(response) {
									toaster.success({

										body : 'Updated Successfully',
										showCloseButton : true,
										timeout : 4000
									});

									$scope.gotoExperienceDetail();
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

					/* date picker */

					$scope.clear = function() {
						$scope.experience.toDate = '';
						$scope.experience.fromDate = '';

					};

					$scope.clearupdate = function() {
						$scope.experienceDetails.toDate = '';
						$scope.experienceDetails.fromDate = '';
					}

					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.open1 = function() {
						$scope.popup1.opened = true;
					};
					$scope.open2 = function() {
						$scope.popup2.opened = true;
					};
					$scope.popup1 = {
						opened : false
					};
					$scope.popup2 = {
						opened : false
					};

					$scope.deleteOpen = function(id) {

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
												pimExperienceService
														.deleteExperience(
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
						$state.go('home.employee.updateExperienceDocument', {
							document : document
						});
					}
					$scope.goToViewDocument = function(document) {
						$state.go('home.employee.viewExperienceDocument', {
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
						documnetService.addDocumnet($scope.person.id,
								"Experience", $scope.document).then(
								function(response) {

									toaster.success({

										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});

									$scope.gotoExperienceDetail();
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
								"Experience").then(function(response) {
							$scope.documentsList = response.data;
						})

					}

					$scope.deleteDocuments = function(document) {
						documnetService
								.deleteDocuments($scope.person.id, document.id)
								.then(
										function(response) {
											$scope.getDocumnets();
											notify({
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
						$scope.document.id = document.id;
						$scope.document.name = document.name;
						documnetService.updateDocumnet($scope.person.id,
								$scope.document.id, $scope.document).then(
								function(response) {
									toaster.success({

										body : 'Updated Successfully',
										showCloseButton : true,
										timeout : 4000
									});

									$scope.gotoExperienceDetail();
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