angular
		.module('srmt')
		.controller(
				"contactDetailController",
				function($scope, lookupService, $state,
						$stateParams, personalService, contactService,
						uploadService, documnetService,$filter,toaster) {
					
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

                  

					$scope.person = personalService.getEmployee();
					if($scope.person==undefined){
						//alert("please Enter the Personal Details of the Employee Before Adding Contact Details")
						toaster
						.warning({
						
							body : 'please Enter the Personal Details of the Employee Before Adding Contact Details',
							showCloseButton : true,
							timeout : 4000
						});
						
					}
					if($scope.person.address!=undefined){
						$scope.searchLookupCountries();
					}
					$scope.gotoAddContactdetail = function() {
						$state.go('home.employee.addContactDetail1');
					}
					$scope.gotoContactDetail = function() {
						$state.go('home.employee.contactDetails');
					}
					$scope.gotoUpadteContactdetail = function() {
						$state.go('home.employee.updateContactDetail');
					}
					$scope.gotoViewContactdetail = function() {
						$state.go('home.employee.viewContactDetail');
					}
					$scope.addContact = function(contact) {
						if($scope.person==undefined){
							//alert("please Enter the Personal Details of the Employee Before Adding Contact Details")
							toaster
							.warning({
							
								body : 'please Enter the Personal Details of the Employee Before Adding Contact Details',
								showCloseButton : true,
								timeout : 4000
							});
							
						}

						$scope.person.dob = $filter('date')(
								$scope.person.dob, 'dd-MM-yyyy');
						if($scope.person.terminationDate!=null)
							$scope.person.terminationDate = $filter('date')(
									$scope.person.terminationDate, 'dd-MM-yyyy');
						if($scope.person.dateOfjoining!=null)
							$scope.person.dateOfjoining = $filter('date')(
									$scope.person.dateOfjoining, 'dd-MM-yyyy');
						contactService
								.addContact($scope.person.id, contact)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Saved Successfully',
												showCloseButton : true,
												timeout : 4000
											});
										} ,
 
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
						$state.go('home.employee.updateContactDocument', {
							document : document
						});
					}
					$scope.goToViewDocument = function(document) {
						$state.go('home.employee.viewContactDocument', {
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
								.addDocumnet($scope.person.id, "Address",
										$scope.document)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
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
							documnetService.getDocumnets($scope.person.id,
									"Address").then(function(response) {
								$scope.documentsList = response.data;
							})
						} else
							return null;

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

				})