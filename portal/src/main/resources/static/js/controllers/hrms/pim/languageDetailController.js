angular
		.module('srmt')
		.controller(
				"pimLanguageController",
				function($scope, SweetAlert, $state, pimLanguageService,
						notify, personalService, $stateParams, $uibModal,toaster) {
					$scope.person = personalService.getEmployee();
					$scope.languageProficiencyDetail = $stateParams.languageProficiencyData;
					$scope.inspiniaTemplate = 'views/common/notify.html';
					console.log("person from langugae proficiency controller"
							+ $scope.person);
					$scope.gotoLanguageDetail = function() {
						$state.go('home.employee.languageDetail');
					}
					$scope.gotoAddLanguageDetail = function() {
						$state.go('home.employee.addLanguage');
					}
					$scope.gotoUpdateLanguageDetail = function(
							thislanguageProficiency) {
						$state.go('home.employee.updateLanguage', {
							languageProficiencyData : thislanguageProficiency
						});
					}
					$scope.gotoViewLanguageDetail = function() {
						$state.go('home.employee.viewLanguage');
					};

					// $scope.getAll

					$scope.getLanguages = function() {
						pimLanguageService.getLanguages(0, 50).then(
								function(response) {
									$scope.languageList = response.data;
								})
					};

					$scope.addLanguageProficiency = function(
							languageProficiency) {
						pimLanguageService
								.addLanguageProficiency($scope.person.id,
										languageProficiency)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoLanguageDetail();
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
					$scope.size = 10;
					$scope.page = 0;
					$scope.getAllLanguageProficiencies = function() {
						pimLanguageService
								.getAllLanguageProficiency($scope.person.id)
								.then(
										function(response) {
											$scope.languageProficiencyList = response.data;
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

					$scope.updateLanguageProficiency = function(
							languageProficiency) {
						pimLanguageService
								.updateLanguageProficiency($scope.person.id,
										languageProficiency.id,
										languageProficiency)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoLanguageDetail();
										}, function(error) {
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
												pimLanguageService
														.deleteLanguageProficiency(
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

				})