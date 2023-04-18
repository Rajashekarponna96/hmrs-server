angular
		.module('srmt')
		.controller(
				"broadcastingMessagesController",
				function($scope, $state, jobCategoryService, $stateParams,
						broadCasteMessagesService, $uibModal,$filter, $localStorage,toaster) {
					$scope.page = 0;
					$scope.size = 10;
					$scope.broadCasteMessageDetail = $stateParams.broadCasteMessage;
					/*$scope.broadCasteMessage = {validFrom : ''};
					$scope.broadCasteMessage.validFrom = new Date();*/	
					console.log($scope.broadCasteMessageDetail);
					$scope.gotoAddBroadcastingMessage = function() {
						$state.go('home.addBroadcastingMessage');
					};
					$scope.gotoEditBroadcastingMessage = function(
							broadCasteMessage) {
							/*var datef = broadCasteMessage.validFrom.split('-');
						    broadCasteMessage.validFrom = new Date(datef[2],parseInt(datef[1])-1,datef[0]);
						    
						    var datet = broadCasteMessage.toValid.split('-');
						    broadCasteMessage.toValid = new Date(datet[2],parseInt(datet[1])-1,datet[0]);*/
						
						$state.go('home.updateBroadcastingMessage', {
							broadCasteMessage : broadCasteMessage
						});
					};
					$scope.gotoBraodcastingMessagesList = function() {
						$state.go('home.broadcastingMessagesList');
					};

					$scope.gotoViewBroadCasteMessgae = function(
							broadCasteMessage) {
						$state.go('home.viewBroadCasteMessage', {
							broadCasteMessage : broadCasteMessage
						});
					}

					$scope.addBroadCasteMessage = function() {
						$scope.broadCasteMessage.toValid = $filter('date')(
								$scope.broadCasteMessage.toValid, 'dd-MM-yyyy');
						$scope.broadCasteMessage.validFrom = $filter('date')(
								$scope.broadCasteMessage.validFrom, 'dd-MM-yyyy');
						console.log('Date:'+$scope.broadCasteMessage.toValid);
						broadCasteMessagesService
								.addBroadCasteMessage($scope.broadCasteMessage)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope
													.gotoBraodcastingMessagesList();
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
					}
					$scope.getBroadCasteMessages = function() {
						broadCasteMessagesService
								.getBroadCasteMessages($scope.page, $scope.size)
								.then(
										function(response) {
											$scope.broadCasteMessageList = response.data;
											/*$scope.getCount();*/
										})
					}
					$scope.updateBroadCasteMessage = function(message) {
						message.toValid = $filter('date')(message.toValid, 'dd-MM-yyyy');
						message.validFrom = $filter('date')(message.validFrom, 'dd-MM-yyyy');
						broadCasteMessagesService
								.updateBroadCasteMessage(message.id, message)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope
													.gotoBraodcastingMessagesList();
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
					}
					$scope.deleteBroadCasteMessage = function(broadCasteMessage) {
						broadCasteMessagesService
								.deleteBroadCasteMessage(broadCasteMessage.id)
								.then(
										function(response) {
											/*Notification
													.error({
														message : '<h4><span class="glyphicon glyphicon-info-sign"></span>Deleted successfully',
														positionX : 'center',
														delay : 2000
													});*/
											$scope.getBroadCasteMessages();
										},
										function(error) {
											/*Notification
													.error({
														message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
																+ error.data.message
																+ '</h4>',
														positionX : 'center',
														delay : 2000
													});*/
										})
					}

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
					/*$scope.getCount = function() {
						broadCasteMessagesService.BroadCasteMessageCount()
								.then(
										function(response) {
											$scope.count = response.data;
											$scope.totalPages = Math
													.ceil($scope.count
															/ $scope.size);
										});
					};*/
					
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
						$scope.searchBroadCasteMessages();
					});

					/**
					 * pagination logic
					 */

					$scope.searchBroadCasteMessages = function() {
						broadCasteMessagesService.searchBroadCasteMessages(
								$scope.searchKey).then(function(response) {
							$scope.broadCasteMessageList = response.data;
						})
					}

					$scope.deleteOpen = function(id) {
						$scope.delId = id;
						var modalInstance = $uibModal.open({

							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',

						});

						modalInstance.result
								.then(
										function() {
											broadCasteMessagesService
													.deleteBroadCasteMessage(id)
													.then(
															function(response) {
																/*Notification
																		.error({
																			message : '<h4><span class="glyphicon glyphicon-trash"></span> Broadcasting Message deleted successfully.</h4>',
																			positionX : 'center',
																			delay : 2000
																		});*/
																$scope.searchBroadCasteMessages();
															},
															function(error) {
																/*Notification
																		.error({
																			message : '<span class="glyphicon glyphicon-remove-circle"></span>'
																					+ error.data.message,
																			positionX : 'center',
																			delay : 2000
																		});*/
															})
										});
					};
					
					
					
					
					
					

					
					/* date picker */
					$scope.broadCasteMessage = {toValid:'',validFrom:''};
					$scope.clear = function() {
					    $scope.broadCasteMessage.toValid = '';
					    $scope.broadCasteMessage.validFrom = '';
					  };
					$scope.clearupdate = function() {
						$scope.broadCasteMessageDetail.toValid ='';
					    $scope.broadCasteMessageDetail.validFrom = '';
					};
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
					
					
				
					
					
					 
                    // /////search methods//////
                    $scope.searchBroadCasteMessages = function(searchKey) {
                    
 
 
                        var url = "?";
                        if (searchKey != undefined && searchKey!="All") {
                            url = url + "searchKey=" + searchKey + "&";
                        }
 
                        var countUrl = url;
                        url = url + "page=" + $scope.page + "&size="
                                + $scope.size;
                        broadCasteMessagesService
                                .searchBroadCasteMessages(url)
                                .then(
                                        function(response) {
                                            $scope.broadCasteMessageList = response.data;
                                            $scope.searchBroadCasteMessagesCount(countUrl);
                                        })
                    }
                    
                    $scope.searchBroadCasteMessagesCount=function(url){
                        var finalUrl = url.substring(0, url.length - 1);
                        broadCasteMessagesService.searchBroadCasteMessagesCount(finalUrl).then(function(response){
                            $scope.count=response.data;
                            $scope.totalPages = Math
                            .ceil($scope.count
                                    / $scope.size);
                        })
                    };
                    
                   
 
                });
