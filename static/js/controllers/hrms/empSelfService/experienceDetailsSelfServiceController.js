
angular
		.module('srmt')
		.controller(
				"experienceDetailsSelfServiceController",
				function($scope, $state, $stateParams, $filter,
						pimExperienceService, notify, $uibModal,
						personalService, documnetService, uploadService,
						personalDetailsSelfService, $localStorage,toaster) {
					
					
					
					$scope.person = personalDetailsSelfService.getEmployee();

					$scope.experienceDetails = $stateParams.experienceData;

					$scope.gotoExperienceDetail = function() {
						$state.go('home.selfService.myinfo.experienceDetails');
					}
					$scope.gotoAddExperienceDetail = function() {
						$state.go('home.selfService.myinfo.addExperience');
					}
					$scope.gotoUpdateExperience = function(thisexperience) {
						/*var datef = thisexperience.fromDate.split('-');
						thisexperience.fromDate = new Date(datef[2],
								parseInt(datef[1]) - 1, datef[0]);*/

						/*var datet = thisexperience.toDate.split('-');
						thisexperience.toDate = new Date(datet[2],
								parseInt(datet[1]) - 1, datet[0]);*/
						$state.go('home.selfService.myinfo.updateExperience', {
							experienceData : thisexperience
						});
					}
					$scope.gotoViewExperienceDetail = function() {
						$state.go('home.selfService.myinfo.viewExperience');
					};

					$scope.getAllExperience = function() {
						pimExperienceService
								.getAllExperience($localStorage.loginId)
								.then(
										function(response) {
											$scope.experienceList = response.data;
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

					$scope.addExperience = function(experience) {
						experience.fromDate = $filter('date')(
								experience.fromDate, 'dd-MM-yyyy');
						experience.toDate = $filter('date')(experience.toDate,
								'dd-MM-yyyy');
						pimExperienceService
								.addExperience($localStorage.loginId,
										experience)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Saved Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoExperienceDetail();
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

					$scope.updateExperience = function(experience) {
						experience.fromDate = $filter('date')(
								experience.fromDate, 'dd-MM-yyyy');
						experience.toDate = $filter('date')(experience.toDate,
								'dd-MM-yyyy');
						pimExperienceService
								.updateExperience($localStorage.loginId,
										experience.id, experience)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Saved Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoExperienceDetail();
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
						$state.go('home.selfService.myinfo.updateExperienceDocument',
								{
									document : document
								});
					}
					$scope.goToViewDocument = function(document) {
						$state.go('home.selfService.myinfo.viewExperienceDocument', {
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
								.addDocumnet($localStorage.loginId,
										"Experience", $scope.document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Uploaded Successfully',
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
						documnetService.getDocumnets($localStorage.loginId,
								"Experience").then(function(response) {
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