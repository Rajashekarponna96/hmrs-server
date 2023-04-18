angular
		.module('srmt')
		.controller(
				"documentsModuleController",
				function($scope, $state, documentCategoryService,$localStorage,
						uploadService, documnetService, documentModuleService,
						Notification, $filter, $uibModal, $stateParams,
						$uibModal) {
					$scope.page = 0;
					$scope.size = 50;
					
					$scope.featureActionList = $localStorage.featureActionList;

					$scope.hasFeatureWithAction = function(name) {
						var feature=undefined;
						
						var found = false;
						angular.forEach($scope.featureActionList, function(
								featureAction) {
							
							if (featureAction.feature.name == name) {
								feature = featureAction;
							}
						});
						return feature;
						
					};

					$scope.documentDetails = $stateParams.docData;
					$scope.getDocumentCategories = function() {
						documentModuleService
								.getDocumentCategories($scope.page, $scope.size)
								.then(
										function(response) {
											$scope.documentCategoryList = response.data;
										})
					}
					$scope.gotoDocumentCategoryList = function() {
						$state.go("home.documentation");
					}
					$scope.gotoAddDocuments = function() {
						$state.go("home.addDocuments");
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

											Notification
													.success({
														message : '<h4><span class="glyphicon glyphicon-ok"></span>  Uploaded successfully.</h4>',
														positionX : 'center',
														delay : 2000

													})
											$scope.gotoDocumentCategoryList();
										},

										function(error) {
											Notification
													.error({
														message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
																+ error.data.message
																+ '</h4>',
														positionX : 'center',
														delay : 2000

													})

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
											Notification
													.error({
														message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
																+ error.data.message
																+ '</h4>',
														positionX : 'center',
														delay : 2000

													})

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
														Notification
																.error({
																	message : '<h4><span class="glyphicon glyphicon-trash"></span> Document deleted successfully.</h4>',
																	positionX : 'center',
																	delay : 2000
																});
														$scope
																.getDocumentCategories();
													},
													function(error) {
														Notification
																.error({
																	message : '<span class="glyphicon glyphicon-remove-circle"></span>'
																			+ error.data.message,
																	positionX : 'center',
																	delay : 2000
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
						$state.go("home.updateDocument", {
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

											Notification
													.success({
														message : '<h4><span class="glyphicon glyphicon-ok"></span>  Uploaded successfully.</h4>',
														positionX : 'center',
														delay : 2000

													})
											$scope.gotoDocumentCategoryList();
										},

										function(error) {
											Notification
													.error({
														message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
																+ error.data.message
																+ '</h4>',
														positionX : 'center',
														delay : 2000

													})

										})
					};

					$scope.updateDocumentById = function(documentDetails) {
						$scope.document.id = documentDetails.id;
						$scope.document.name = documentDetails.name;
						console.log($scope.document);
						documnetService
								.updateDocumentById(
										$scope.document.id,
										$scope.document)
								.then(
										function(response) {
											Notification
													.success({
														message : '<h4><span class="glyphicon glyphicon-ok"></span> Document Updated successfully.</h4>',
														positionX : 'center',
														delay : 2000
													});
											$scope.gotoDocumentCategoryList();

										},
										function(error) {
											Notification
													.error({
														message : '<span class="glyphicon glyphicon-remove-circle"></span>'
																+ error.data.message,
														positionX : 'center',
														delay : 2000
													});
										})

					};
				});