
angular
		.module('srmt')
		.controller(
				"dependentsSelfServiceController",
				function($scope, $state, dependentService, personalService,
						notify, $stateParams, documnetService,
						uploadService, $filter, $localStorage, $uibModal,
						personalDetailsSelfService,toaster,SweetAlert) {
					
					
					
					$scope.booleanList = [{value:true,name:'Yes'},{value:false,name:'No'}]
					
					console.log($localStorage.loginId);
					$scope.person = personalDetailsSelfService.getEmployee();
					console.log($scope.person);

					$scope.gotoDependentDetail = function() {
						$state.go('home.selfService.myinfo.dependentDetails');
					}
					$scope.gotoAddDependentDetail = function() {
						$state.go('home.selfService.myinfo.addDependentDetail');
					}

					$scope.dependentDetail = $stateParams.dependent;
					$scope.gotoUpdateDependentDetail = function(dependent) {
						/*var datef = dependent.dob.split('-');
						dependent.dob = new Date(datef[2],
								parseInt(datef[1]) - 1, datef[0]);*/
						$state.go('home.selfService.myinfo.updatedependentDetail', {
							dependent : dependent
						});
					}
					$scope.gotoViewDependentDetail = function() {
						$state.go('home.selfService.myinfo.viewDependentDetail');
					}

					$scope.addDependent = function(dependent) {
						dependent.dob = $filter('date')(dependent.dob,
								'dd-MM-yyyy');
						$scope.person.dob = $filter('date')($scope.person.dob,
								'dd-MM-yyyy');
						if ($scope.person.terminationDate != null)
							$scope.person.terminationDate = $filter('date')
									($scope.person.terminationDate,
											'dd-MM-yyyy');
						if ($scope.person.dateOfjoining != null)
							$scope.person.dateOfjoining = $filter('date')(
									$scope.person.dateOfjoining, 'dd-MM-yyyy');
						dependentService
								.addDependent($localStorage.loginId, dependent)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDependentDetail();
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

					$scope.getDependentList = function(dependent) {
						if ($scope.person != undefined) {
							dependentService.getDependentList(
									$localStorage.loginId).then(
									function(response) {
										$scope.dependentlist = response.data;
									});
						}

					}
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
								dependentService
								.deleteDependent($scope.person.id,id) .then(
										 function(response) {
								SweetAlert.swal("Deleted!",
										" deleted successfully", "success");
								$scope.getDependentList();
										 })
							} else {
								SweetAlert.swal("Cancelled", "Your information is safe",
										"error");
							}
						});
					
		}
			
					

					$scope.updateDependent = function(dependent) {
						dependent.dob = $filter('date')(dependent.dob,
								'dd-MM-yyyy');
						$scope.person.dob = $filter('date')($scope.person.dob,
								'dd-MM-yyyy');
						if ($scope.person.terminationDate != null)
							$scope.person.terminationDate = $filter('date')
									($scope.person.terminationDate,
											'dd-MM-yyyy');
						if ($scope.person.dateOfjoining != null)
							$scope.person.dateOfjoining = $filter('date')(
									$scope.person.dateOfjoining, 'dd-MM-yyyy');
						dependentService
								.updateDependent($localStorage.loginId,
										dependent.id, dependent)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDependentDetail();
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

					// ////////////////////////*******to upload
					// documents***********////////////////

					$scope.documentDetail = $stateParams.document;
					console.log($stateParams.document);

					$scope.goToUpdateDocument = function(document) {
						$state.go('home.selfService.myinfo.updateDependentDocument', {
							document : document
						});
					}
					$scope.goToViewDocument = function(document) {
						$state.go('home.selfService.myinfo.viewDependentDocument', {
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
										"Dependent", $scope.document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDependentDetail();
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
						if ($scope.person != undefined) {
							documnetService.getDocumnets($localStorage.loginId,
									"Dependent").then(function(response) {
								$scope.documentsList = response.data;
							})
						} else
							return null;

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
						documnetService
								.updateDocumnet($localStorage.loginId,
										document.id, document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDependentDetail();
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

					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.open1 = function() {

						$scope.popup1.opened = true;
					};

					$scope.popup1 = {
						opened : false
					};
					$scope.clear = function() {
						$scope.dependent.dob = '';
					};

					$scope.docPath = function(path) {
						var imagepath = uploadService.imagePath(path);
						return imagepath;
					};
				})