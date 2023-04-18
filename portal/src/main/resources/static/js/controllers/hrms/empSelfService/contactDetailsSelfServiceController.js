angular
		.module('srmt')
		.controller(
				"contactDetailsSelfServiceController",
				function($scope, $localStorage, contactDetailsSelfService,
						notify, $filter, $uibModal, $state, $stateParams,
						$localStorage, personalDetailsSelfService,
						uploadService, documnetService, lookupService,
						contactService,toaster) {
					
					
					
					$scope.init=function(){
						$scope.getEmployeeById();
						$scope.getCountries();
						$scope.getDocumnets();
					}
					
					
					$scope.getCountries = function() {
						lookupService.getCountries().then(function(response) {
							$scope.countriesList = response.data;
						})
					}
					$scope.getStates = function(countryId) {
						console.log(countryId);
						lookupService.getStates(countryId).then(
								function(response) {
									$scope.statesList = response.data;
								})
					}
					$scope.getDistricts = function(stateId) {
						lookupService.getDistricts(stateId).then(
								function(response) {
									$scope.districtList = response.data;
								})
					};

					$scope.searchLookupCountries = function() {
						$scope.getStates($scope.person.address.country.id);
						$scope.getDistricts($scope.person.address.state.id);
					}

					$scope.person = personalDetailsSelfService.getEmployee();
					// $scope.searchLookupCountries();

					if ($scope.person != undefined) {
						$scope.searchLookupCountries();
					}
					$scope.gotoAddContactdetail = function() {
						$state.go('home.selfService.myinfo.contactDetails');
					}
					$scope.gotoContactDetail = function() {
						$state.go('home.selfService.myinfo.contactDetails');
					}
					$scope.gotoUpadteContactdetail = function() {
						$state.go('home.selfService.myinfo.contactDetails');
					}
					$scope.gotoViewContactdetail = function() {
						$state.go('home.selfService.myinfo.contactDetails');
					}
					$scope.addContact = function(contact) {

						$scope.person.dob = $filter('date')($scope.person.dob,
								'dd-MM-yyyy');
						if ($scope.person.terminationDate != null)
							$scope.person.terminationDate = $filter('date')
									($scope.person.terminationDate,
											'dd-MM-yyyy');
						if ($scope.person.dateOfjoining != null)
							$scope.person.dateOfjoining = $filter('date')(
									$scope.person.dateOfjoining, 'dd-MM-yyyy');
						contactService
								.addContact($localStorage.loginId, contact)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Saved Successfully',
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

					// ////////////////////////*******to upload
					// documents***********////////////////
					$scope.documentDetail = $stateParams.document;

					$scope.goToUpdateDocument = function(thisdocument) {
//						console.log("document "+$stateParams.document + " " + document);
						$state.go('home.selfService.myinfo.updateContactDocument', {
							document : thisdocument
						});
					}
					$scope.goToViewDocument = function(document) {
						$state.go('home.selfService.myinfo.viewContactDocument', {
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

					$scope.addDocument = function() {
						$scope.document.name = $scope.fileName;
						console.log("$scope.document" + $scope.document);
						documnetService
								.addDocumnet($localStorage.loginId, "Address",
										$scope.document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Uploaded Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoAddContactdetail();
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
									"Address").then(function(response) {
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
											$scope.gotoAddContactdetail();
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