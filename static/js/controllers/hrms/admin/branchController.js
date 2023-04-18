angular
		.module('srmt')
		.controller(
				"branchController",
				function($scope, $state, branchService, 
						regionalOfficeService, $stateParams,
						regionalOfficeService,Notification) {
					$scope.gotoBranchDetailsPage = function() {
						$state.go('home.branchDetails');
					}
					$scope.gotoAddBranchDetailsPage = function() {
						$state.go('home.addBranch');
					}

					$scope.gotoUpdateBranchDetailsPage = function(branch) {
						$state.go('home.updateBranchDetails', {
							branch : branch
						});
					}
					$scope.viewBranch = $stateParams.branch;
					console.log($scope.viewBranch);
					$scope.gotoViewBranch = function(branch) {
						$state.go('home.viewBranch', {
							branch : branch
						});
					}
					$scope.addbranchOffice = function() {
						$scope.branchOffice.regionalOfficeMaster = $scope.regionalOffice
						branchService.addBranch($scope.regionalOffice.id,
								$scope.branchOffice).then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoBranchDetailsPage();
										}, function(error) {
											Notification.error({
												message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
												positionX : 'center',
												delay : 2000
											});
										})
					}
					$scope.page = 0;
					$scope.size = 10;
					$scope.getRegionalOfficeList = function() {
						branchService.getRegionalOfficeList().then(
								function(response) {
									$scope.regionalOfficeList = response.data;
								}, function(error) {
									Notification.error({
										message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
										positionX : 'center',
										delay : 2000
									});
								})
					}

					$scope.getBranches = function() {
						branchService.getBranches($scope.page, $scope.size)
								.then(function(response) {
									$scope.BranchOfficeList = response.data;
									
								})
					};

					$scope.deleteBranch = function(branch) {
						branchService.deleteBranch(branch.id).then(
								function(response) {
									Notification
											.success({
												message :  '<h4><span class="glyphicon glyphicon-info-sign"></span>Deleted successfully</h4>',
												positionX : 'center',
												delay : 2000
											});
									$scope.getBranches();
								}, function(error) {
									Notification.error({
										message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
										positionX : 'center',
										delay : 2000
									});
								})
					};
					$scope.updateBranch = function(branch) {
						branchService.updateBranch(
								branch.regionalOfficeMasterOFtheBranch.id,
								branch.id, branch).then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoBranchDetailsPage();
										}, function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});

										})
					};

					$scope.getCountries = function() {
						regionalOfficeService.getCountries().then(
								function(response) {
									$scope.countriesList = response.data;
								})
					};
					$scope.getStates = function() {
						regionalOfficeService.getStates(
								$scope.address.country.id).then(
								function(response) {
									$scope.statesList = response.data;
								})
					};
					$scope.getDistricts = function() {
						regionalOfficeService.getDistricts(
								$scope.address.state.id).then(
								function(response) {
									$scope.districtList = response.data;
								})
					};
					$scope.getAllRegionalOffice = function() {
						branchService.getRegionalOfficeList().then(
								function(response) {
									$scope.regionalOfficeList = response.data;
								});
					};
					$scope.getBranchesByRegionalOfficeList = function(id) {
						regionalOfficeService.getBranchesByregionalOfficeId(id)
								.then(function(response) {
									$scope.branchList = response.data;
								});
					};
					$scope.size = 10;
					$scope.page = 0;
					$scope.searchRegistrationOffice = function(regionalOffice,
							branch) {

						var url = "?";
						if (regionalOffice != undefined) {
							url = url + "regionalOfficeId=" + regionalOffice.id
									+ "&";
						}
						if (branch != undefined) {
							url = url + "branchId=" + branch.id + "&";
						}
						var CountUrl = url;

						url = url + "page=" + $scope.page + "&size="
								+ $scope.size;
						branchService
								.searchRegistrationOfficeByBranchIdAndOfficeId(
										url)
								.then(
										function(response) {
											$scope.BranchOfficeList = response.data;
											$scope
													.searchRegistrationOfficeCount(CountUrl);
										});

					};
					$scope.searchRegistrationOfficeCount = function(url) {

						var finalUrl = url.substring(0, url.length - 1);
						branchService
								.searchRegistrationOfficeByBranchIdAndOfficeIdCount(
										finalUrl).then(
										function(response) {
											$scope.count = response.data;
											$scope.totalPages = Math
													.ceil($scope.count
															/ $scope.size);
										});

					};

					/**
					 * pagination logic
					 * 
					 * need to count total page in count menthos need to call
					 * count() in data list method.
					 * 
					 * need to call data list methis in $scope.$watchGroup([
					 * 'page', 'size' ]
					 * 
					 * need to take care about sno neeed to check recods for
					 * page need to check totla records
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
						return $scope.page === $scope.totalPages - 1 ? "disabled"
								: "";
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

					$scope.$watchGroup([ 'page', 'size' ], function(newVal,
							oldVal) {
						$scope.searchRegistrationOffice();
					});

					/**
					 * pagination logic
					 */

				})