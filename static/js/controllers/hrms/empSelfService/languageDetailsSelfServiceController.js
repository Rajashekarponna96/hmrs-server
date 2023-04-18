angular
		.module('srmt')
		.controller(
				"languageDetailsSelfServiceController",
				function($scope, $state, pimLanguageService, personalService,
						$localStorage, notify, $stateParams, $uibModal,
						personalDetailsSelfService,toaster,SweetAlert) {
										$scope.person = personalDetailsSelfService.getEmployee();
					$scope.languageProficiencyDetail = $stateParams.languageProficiencyData;

					console.log("person from langugae proficiency controller"
							+ $scope.person);
					$scope.gotoLanguageDetail = function() {
						$state.go('home.selfService.myinfo.languageDetails');
					}
					$scope.gotoAddLanguageDetail = function() {
						$state.go('home.selfService.myinfo.addLanguage');
					}
					$scope.gotoUpdateLanguageDetail = function(
							thislanguageProficiency) {
						$state.go('home.selfService.myinfo.updateLanguage', {
							languageProficiencyData : thislanguageProficiency
						});
					}
					$scope.gotoViewLanguageDetail = function() {
						$state.go('home.selfService.myinfo.viewLanguage');
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
								.addLanguageProficiency($localStorage.loginId,
										languageProficiency)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Saved Successfully',
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
								.getAllLanguageProficiency(
										$localStorage.loginId)
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
								.updateLanguageProficiency(
										$localStorage.loginId,
										languageProficiency.id,
										languageProficiency)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Saved Successfully',
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

					$scope.deleteOpen2=function(id){
						
						SweetAlert.swal({
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
								 pimLanguageService.deleteLanguageProficiency($scope.person.id,id) .then(
										 function(response) {
								SweetAlert.swal("Deleted!",
										" deleted successfully", "success");
								$scope.getAllLanguageProficiencies();
										 })
							} else {
								SweetAlert.swal("Cancelled", "Your information is safe",
										"error");
							}
						});
					
		}
				})