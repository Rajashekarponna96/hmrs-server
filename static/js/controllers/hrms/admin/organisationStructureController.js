angular.module('srmt').controller("organisationStructureController",function($scope,$state){
	
	console.log("controller organisation called");
	$scope.gotoOrganisationStructureDetails=function(){
		$state.go('home.organisationStructureDetails');
	}
	
	$scope.gotoAddSubUnit=function(){
		$state.go('home.addSubUnit');
	}
	
	$scope.gotoAddUnit=function(){
		$state.go('home.addUnit');
	}
	
	$scope.gotoEditOrganisationStructureDetails=function(){
		$state.go('home.editOrganisationStructure');
	}
});