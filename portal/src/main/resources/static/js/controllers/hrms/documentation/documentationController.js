angular
		.module('srmt')
		.controller(
				"documentationController",
				function($scope, $state, documentCategoryService,
						$localStorage, uploadService, documnetService,
						documentationService, toaster, $filter, $uibModal,
						$stateParams, $uibModal) {
					$scope.page = 0;
					$scope.size = 50;

					

					$scope.documentDetails = $stateParams.docData;
					$scope.getDocumentCategories = function() {
						documentationService
								.getDocumentCategories($scope.page, $scope.size)
								.then(
										function(response) {
											$scope.documentCategoryList = response.data;
										})
					}
					$scope.gotoDocumentCategoryList = function() {
						$state.go("home.documentation.documentationList");
					}
					$scope.gotoAddDocuments = function() {
						$state.go("home.documentation.addDocuments");
					}

					// ////////////////////////*******to upload
					// documents***********////////////////

					$scope.documentDetail = $stateParams.document;
					console.log($stateParams.document);

					$scope.document = {};
					$scope.documnetUploads = function(files) {
						uploadService.uploadDocument(files[0]).success(
								function(response) {
									$scope.document = response;

								}).error(function(error) {
							console.log("error");
						});
					};
					$scope.employeeId = 2;
					$scope.uploadDocument = function(doc) {
						$scope.document.name = doc.name;
						$scope.document.category = doc.category.name;
						documnetService
								.addDocumnets(doc.category.id, $scope.document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDocumentCategoryList();
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
					$scope.page = 0;
					$scope.size = 10;
					$scope.getDocumentsList = function() {
						documentCategoryService
								.getAlldocumentCategories($scope.page,
										$scope.size)
								.then(
										function(response) {

											$scope.documentCategoryList = response.data;
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
					$scope.toggleRow = function(index) {
						$scope.selected = index;
					};

					$scope.goToViewDocument = function(thisdocumentCat) {
					};

					$scope.docPath = function(path) {
						var imagepath = uploadService.imagePath(path);
						return imagepath;
					};

					$scope.deleteOpenDoc = function(doc_id) {
						$scope.delId = doc_id;
						var modalInstance = $uibModal.open({

							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',

						});

						modalInstance.result
								.then(function() {
									documnetService
											.deleteDocumentByCategoryId(doc_id)
											.then(
													function(response) {
														toaster
														.success({
														
															body : 'Added Successfully',
															showCloseButton : true,
															timeout : 4000
														});
														$scope
																.getDocumentCategories();
													},
													function(error) {
														toaster.pop({
															type : 'error',
															body : error.data.message,
															showCloseButton : true,
															timeout : 4000
														});
													})
								});
					};
					$scope.document = {
						category : {}
					};

					$scope.goToUpdateDocument = function(documentCategory,
							document) {
						$scope.document = document;
						$scope.document.category = documentCategory;

						console.log($scope.document);
						$state.go("home.documentation.updateDocument", {
							docData : $scope.document
						});
					};

					$scope.updateDocument = function(documentDetails) {
						$scope.document.name = documentDetails.name;
						$scope.document.id = documentDetails.id;
						documnetService
								.updateDocumentByCategoryId($scope.document.id,
										$scope.document)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDocumentCategoryList();
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

					$scope.updateDocumentById = function(documentDetails) {
						$scope.document.id = documentDetails.id;
						$scope.document.name = documentDetails.name;
						console.log($scope.document);
						documnetService
								.updateDocumentById($scope.document.id,
										$scope.document)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDocumentCategoryList();

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
					
					$scope.saveJSON = function (fileName) {
						$scope.toJSON = '';
						$scope.toJSON = angular.toJson($scope.data);
						var blob = new Blob([$scope.toJSON], { type:"application/json;charset=utf-8;" });			
						var downloadLink = angular.element('<a></a>');
			                        downloadLink.attr('href',window.URL.createObjectURL(blob));
			                        downloadLink.attr('download', fileName);
						downloadLink[0].click();
					};
				});