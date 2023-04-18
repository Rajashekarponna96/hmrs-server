var hrmUploadConfig = function() {
	var protocol = "http";
	var host = "210.212.211.120";
	var port = "11000";
	var url = protocol + "://" + host + ":" + port;

	return {
		URL : {
			GET_IMAGE_PATH : function(path) {
				return url + "/srmt-web/documents/" + path;
			}

		}

	}

};

srmtApp.constant('HRM_UPLOAD_CONFIG', hrmUploadConfig());