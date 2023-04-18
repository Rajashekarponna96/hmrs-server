var hrmUploadConfig = function() {
	var protocol = "http";
	var host = "localhost";
	var port = "11006";
	var url = protocol + "://" + host + ":" + port;

	return {
		URL : {
			GET_IMAGE_PATH : function(path) {
				return url + "/srmt-web/documents/" + path;
			}

		}

	}

};

app.constant('HRM_UPLOAD_CONFIG', hrmUploadConfig());