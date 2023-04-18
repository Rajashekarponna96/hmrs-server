
angular.module('filters').filter('datetimepreselect', function() {
  return function(input) {
	  if(input==null){
		  return new Date();
	  }
	  else{
	  console.log("");
	  var dates = input.split(' ');
	  var datef = dates[0].split('-');
		
	  var datet = dates[1].split(':');
	  input = new Date(datef[2],
				parseInt(datef[1]) - 1, datef[0], datet[0],datet[1],datet[2]);
		return input;
	  }
  };
});