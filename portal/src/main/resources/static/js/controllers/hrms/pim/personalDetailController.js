angular.module('srmt').controller(
		"personalDetailController",
		function($scope, $state, personalService, $localStorage, $stateParams,
				LocationService, locationDepartmentService, uploadService,
				employeeService, documnetService, uploadService, $filter,
				toaster) {

			
			
			console.log("hello world...");

			$scope.person = personalService.getEmployee();
			console.log($scope.person);
			if ($scope.person != null) {
				if ($scope.person.dob != null) {

				}
			}
			$scope.goToAddPersonalDeatails = function() {
				personalService.setEmployeee(null);
				$state.go('home.employee.addPersonDetails');
			}
			$scope.gotoAddPageForUpdatePerson = function(person) {
				personalService.setEmployeee(person);
				$state.go('home.employee.addPersonDetails');
			};

			$scope.goTopersonaldetailsFirst = function() {
				$state.go('home.employee.addPersonDetails');
			};

			$scope.gotopersonaldetail = function() {
				$state.go('home.employeeList');
			};
			$scope.gotoViewPersonDetail = function(person) {
				personalService.setEmployeee(person);
				$state.go('home.viewPersonalDetail');
			}

			$scope.page = 0;
			$scope.size = 10;

			/**
			 * pagination logic
			 * 
			 * need to count total page in count menthos need to call count() in
			 * data list method.
			 * 
			 * need to call data list methis in $scope.$watchGroup([ 'page',
			 * 'size' ]
			 * 
			 * need to take care about sno neeed to check recods for page need
			 * to check totla records
			 */

			$scope.prevPage = function() {
				if ($scope.page > 0) {
					$scope.page--;
				}
			};

			$scope.prevPageDisabled = function() {
				return $scope.page === 0 ? "disabled" : "";
			};

			$scope.nextPage = function() {
				if ($scope.page < $scope.totalPages - 1) {
					$scope.page++;
				}
			};

			$scope.nextPageDisabled = function() {
				return $scope.page === $scope.totalPages - 1 ? "disabled" : "";
			};

			$scope.firstPage = function() {
				$scope.page = 0;
			};
			$scope.lastPage = function() {
				$scope.page = $scope.totalPages - 1;

			};
			$scope.recordsPerPage = function() {
				$scope.page = 0;
				$scope.size = $scope.PerPage;
			}

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.searchEmployee();
			});

			$scope.getCount = function(countUrl) {
				employeeService.getCount(countUrl).then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.imagePath = function() {
				if ($scope.person != undefined) {
					var imagepath = uploadService
							.imagePath($scope.person.photoPath);
				}
				if ($scope.person == undefined) {
					var imagepath = "dist/img/avatar2.png";
				}
				return imagepath;

			}
			
			$scope.impath='';
			
			$scope.documentDetail = $stateParams.document;
			console.log($scope.documentDetail);
			$scope.document = {};
			$scope.documnetUploads = function(files) {
				uploadService.uploadDocument(files[0]).success(
						function(response) {
							$scope.document = response;
							$scope.impath = $scope.document.imagepath;
							console.log("at image upload:" + $scope.impath);
						}).error(function(error) {
					console.log("error");
				});
			};

			$scope.addPersonalDetail = function(person) {
				if (person.dob != null)
					person.dob = $filter('date')(person.dob, 'dd-MM-yyyy');
				if (person.terminationDate != null)
					person.terminationDate = $filter('date')(
							person.terminationDate, 'dd-MM-yyyy');
				if (person.dateOfjoining != null)
					person.dateOfjoining = $filter('date')(
							person.dateOfjoining, 'dd-MM-yyyy');
				console.log($scope.document);
				person.photoPath = $scope.impath;
				console.log("setting image path to person "+person.photoPath);
				personalService.addPersonalDetail(person).then(
						function(response) {
							toaster.success({

								body : 'Saved Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.imagePath();
							console.log(person);
							console.log(response.data);
							personalService.setEmployeee(response.data);
							console.log(personalService.getEmployee());

						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			}

			/*
			 * $scope.getEmployeeList = function() {
			 * personalService.getEmployeeList($scope.page, $scope.size).then(
			 * function(response) { $scope.employeeList = response.data;
			 * $scope.getCount(); }) };
			 */
			$scope.gotoUploadPersonalDocuments = function() {
				var employee = personalService.getEmployeee();
				$state.go('home.employee.addFile', {
					person : employee
				});
			};

			$scope.updatePerson = function(person) {
				/*
				 * if (person.terminationDate != null) person.terminationDate =
				 * $filter('date')( person.terminationDate, 'dd-MM-yyyy'); if
				 * (person.dateOfjoining != null) person.dateOfjoining =
				 * $filter('date')( person.dateOfjoining, 'dd-MM-yyyy');
				 */
				console.log($scope.document);
				console.log($scope.impath);
				person.photoPath = $scope.impath;
				console.log("setting image path to person "+person.photoPath);
				personalService.updatePerson(person.id, person).then(
						function(response) {
							toaster.success({

								body : 'Saved Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							console.log("after update response object"
									+ $scope.impath);
							personalService.setEmployeee(response.data);
							console.log(personalService.getEmployee());

						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})

			}

			$scope.goToUpdateDocument = function(document) {
				$state.go('home.employee.updateDocument', {
					document : document
				});
			}
			$scope.goToViewDocument = function(document) {
				$state.go('home.employee.viewDocument', {
					document : document
				});
			}

			// employeeDocuments
			$scope.addDocument = function() {

				$scope.document.name = $scope.fileName;
				console.log("$scope.document" + $scope.document);
				documnetService.addDocumnet($scope.person.id, "Employee",
						$scope.document).then(function(response) {

					toaster.success({

						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});
					$state.go('home.employee.addPersonDetails');
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
					documnetService.getDocumnets($scope.person.id, "Employee")
							.then(function(response) {
								$scope.documentsList = response.data;
							})
				} else
					return null;

			}

			$scope.deleteDocuments = function(document) {
				documnetService.deleteDocuments($scope.person.id, document.id)
						.then(function(response) {
							$scope.getDocumnets();

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

			$scope.updateDocumnet = function(documentDetail) {
				$scope.document.id = documentDetail.id;
				$scope.document.name = documentDetail.name;
				documnetService.updateDocumnet($scope.person.id,
						$scope.document.id, $scope.document).then(
						function(response) {
							toaster.success({

								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$state.go('home.employee.addPersonDetails');
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

			/* date picker */

			$scope.dateOptions = {
				startingDay : 1
			};

			$scope.open1 = function() {
				$scope.person.dob = '';
				$scope.popup1.opened = true;
			};

			$scope.popup1 = {
				opened : false
			};
			/*
			 * $scope.clear = function(){ $scope.person.dob =''; };
			 */
			$scope.docPath = function(path) {
				var imagepath = uploadService.imagePath(path);
				return imagepath;
			};
			// /******set status

			$scope.setStatus = function() {
				personalService.setStatus($scope.person.id).then(
						function(response) {

							toaster.success({

								body : 'Status Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotopersonaldetail();
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
			$scope.getAlltLocations = function() {
				LocationService.getAlltLocations().then(function(response) {
					$scope.locationList = response.data;
				})
			}
			$scope.getDepartmentsByLocation = function(locationId) {
				locationDepartmentService.getAllLocationDepartments(locationId)
						.then(function(response) {
							$scope.departmentList = response.data;

						});
			}
			$scope.searchEmployee = function() {
				var url = "?"
				if ($scope.employeeId != undefined) {
					url = url + "employeeId=" + $scope.employeeId + "&"
				}
				if ($scope.location != undefined) {
					url = url + "locationId=" + $scope.location.id + "&"
				}
				if ($scope.department != undefined) {
					url = url + "departmentId=" + $scope.department.id + "&"
				}

				countUrl = url;
				countUrl = countUrl.substr(0, countUrl.length - 1);
				url = url + "page=" + $scope.page + "&size=" + $scope.size;
				employeeService.searchEmployee(url).then(function(response) {
					$scope.employeeList = response.data;
					$scope.getCount(countUrl);
				})
			}

		})