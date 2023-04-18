var hrmConfig = function() {
	var protocol = "http";
	var host = "localhost";
	var port = "11005";
	var url = protocol + "://" + host + ":" + port;

	return {
		URL : {
			GET_JOB_CATEGORY_LIST : function(page, size) {

				return url + "/jobCategoryMaster/all?page=" + page + "&size="
						+ size;
			},
			ADD_JOB_CATEGORY : function() {

				return url + "/jobCategoryMaster/";
			},
			DELETE_JOB_CATEGORY : function(id) {

				return url + "/jobCategoryMaster/" + id;

			},
			EDIT_JOB_CATEGORY : function(id) {

				return url + "/jobCategoryMaster/" + id;

			},

			JOB_CATEGORY_COUNT : function(id) {

				return url + "/jobCategoryMaster/count";

			},

			/* Divisional URLs */

			GET_DIVISIONAL_DETAILS_LIST : function(page, size) {

				return url + "/divisionMaster/pagination?page=" + page
						+ "&size=" + size;
			},
			ADD_DIVISIONAL_DETAIL : function() {

				return url + "/divisionMaster/";
			},
			DELETE_DIVISIONAL_DETAIL : function(id) {

				return url + "/divisionMaster/" + id;

			},
			UPDATE_DIVISIONAL_DETAIL : function(id) {

				return url + "/divisionMaster/" + id;

			},

			DIVISIONAL_DETAIL_COUNT : function() {

				return url + "/divisionMaster/count";

			},
			/* ORGANIZATION (COMPANY_INFO ) URLS */

			ADD_ORGANIZATION_DETAILS : function() {
				return url + "/companyInfo/";

			},
			FIND_ORGANIZATION_BY_FIRST : function() {
				return url + "/companyInfo/first"
			},
			UPDATE_ORGANIZATION : function(id) {
				return url + "/companyInfo/" + id;
			},

			/* REGIONAL OFFICE URLS */

			ADD_REGIONAL_OFFICE : function() {
				return url + "/regionalOfficeMaster/";
			},
			GET_REGIONAL_OFFICE_LIST : function(page, size) {
				return url + "/regionalOfficeMaster/pagination?page=" + page
						+ "&size=" + size;
			},

			UPDATE_REGIONAL_OFFICE : function(id) {
				return url + "/regionalOfficeMaster/" + id;
			},

			DELETE_REGIONAL_OFFICE : function(id) {
				return url + "/regionalOfficeMaster/" + id;
			},

			REGIONAL_OFFICE_COUNT : function() {
				return url + "/regionalOfficeMaster/count";
			},
			GET_BRANCHES_BY_REGIONAL_OFFICE_ID : function(id) {
				return url + "/regionalOfficeMaster/" + id + "/branches";
			},

			/* Job Title URLs */

			ADD_JOB_TITLE : function() {

				return url + "/jobTitle/";
			},
			UPDATE_JOB_TITLE : function(id) {
				return url + "/jobTitle/" + id;
			},

			GET_JOB_TITLES_LIST : function(page, size) {
				return url + "/jobTitle/pagination?page=" + page + "&size="
						+ size;
			},
			GET_JOB_TITLES_COUNT : function() {
				return url + "/jobTitle/count";
			},
			DELETE_JOB_TITLE : function(id) {
				return url + "/jobTitle/" + id;
			},

			/* BRANCH DETAILS URLS */

			ADD_BRANCH : function(id) {
				return url + "/regionalOfficeMaster/" + id + "/branch"
			},
			GET_REGIONALOFFICE_LIST : function() {
				return url + "/regionalOfficeMaster/all"
			},
			GET_BRANCHES : function(page, size) {
				return url + "/branchMaster/pagination?page=" + page + "&size="
						+ size;
			},
			DELETE_BRANCH : function(id) {
				return url + "/branchMaster/" + id;
			},
			UPDATE_BRANCH : function(id, branchId) {
				return url + "/regionalOfficeMaster/" + id + "/branch/"
						+ branchId;
			},

			SEARCH_BY_BRANCH_ORGANIZATION : function(serachUrl) {
				return url + "/branchMaster/search" + serachUrl;
			},

			/* Employment type urls */
			GET_EMPLOYMENT_TYPE_LIST : function(page, size) {
				return url + "/employeeTypeMaster/pagination?page=" + page
						+ "&size=" + size;
			},

			ADD_EMPLOYMENT_TYPE : function() {
				return url + "/employeeTypeMaster/";
			},
			UPDATE_EMPLOYMENT_TYPE : function(id) {
				return url + "/employeeTypeMaster/" + id;
			},
			DELETE_EMPLOYMENT_TYPE : function(id) {
				return url + "/employeeTypeMaster/" + id;
			},
			GET_EMPLOYMENT_COUNT : function() {
				return url + "/employeeTypeMaster/count";
			},

			/* Education Level URLs */
			GET_EDUCATION_LEVEL_COUNT : function() {
				return url + "/EducationLevelMaster/count";
			},
			GET_EDUCATION_LEVEL_LIST : function(page, size) {
				return url + "/EducationLevelMaster/pagination?page=" + page
						+ "&size=" + size;
			},
			ADD_EDUCATION_LEVEL : function() {
				return url + "/EducationLevelMaster/";
			},
			DELETE_EDUCATION_LEVEL : function(id) {
				return url + "/EducationLevelMaster/" + id;
			},
			UPDATE_EDUCATION_LEVEL : function(id) {
				return url + "/EducationLevelMaster/" + id;
			},

			/* Document Category urls */
			GET_DOCUMENT_CATEGORY_LIST : function(page, size) {
				return url + "/documentCategoryMaster/pagination?page=" + page
						+ "&size=" + size;
			},

			ADD_DOCUMENT_CATEGORY : function() {
				return url + "/documentCategoryMaster/";
			},
			GET_DOCUMENT_CATEGORY_COUNT : function() {
				return url + "/documentCategoryMaster/count";
			},
			UPDATE_DOCUMENT_CATEGORY : function(id) {
				return url + "/documentCategoryMaster/" + id;
			},
			DELETE_DOCUMENT_CATEGORY : function(id) {
				return url + "/documentCategoryMaster/" + id;
			},
			ADD_DOCUMENT_BY_CATEGORY_ID : function(id) {
				return url + "/documentCategoryMaster/" + id + "/document";
			},

			/* BROADCASTE MESSAGES */
			ADD_BROADCASTE_MESSAGES : function() {
				return url + "/broadcastMessage/";
			},
			GET_BROADCASTE_MESSAGES : function(page, size) {
				return url + "/broadcastMessage/pagination?page=" + page
						+ "&size=" + size;
			},
			UPDATE_BROADCASTE_MESSAGE : function(id) {
				return url + "/broadcastMessage/" + id;
			},
			DELETE_BROADCASTE_MESSAGE : function(id) {
				return url + "/broadcastMessage/" + id;
			},
			GET_BROADCASTE_MESSAGE_COUNT : function() {
				return url + "/broadcastMessage/count";
			},
			SEARCH_BROADCASTE_MESSAGE_WITH_PAGE_SIZE : function(dataurl) {
				return url + "/broadcastMessage/search/" + dataurl;
			},
			SEARCH_BROADCASTE_MESSAGE_COUNT : function(dataurl) {
				return url + "/broadcastMessage/search/count/" + dataurl;
			},

			GET_CURRENTDAY_BROADCAST_MESSAGES : function() {
				return url + "/broadcastMessage/activeMessage";
			},

			/* Leave Period URLs */
			GET_LEAVE_PERIOD_LIST : function(page, size) {
				return url + "/leavePeriod/pagination?page=" + page + "&size="
						+ size;
			},
			GET_LEAVE_PERIODS_COUNT : function() {
				return url + "/leavePeriod/count";
			},
			DELETE_LEAVE_PERIOD_TITLE : function(id) {
				return url + "/leavePeriod/" + id;
			},
			ADD_LEAVE_PERIOD : function() {
				return url + "/leavePeriod/";
			},
			UPDATE_LEAVE_PERIOD : function(id) {
				return url + "/leavePeriod/" + id;
			},
			GET_ALL_LEAVE_PERIOD_LIST : function() {
				return url + "/leavePeriod/all";
			},

			/* Leave type URLs */
			GET_LEAVE_TYPE_LIST : function(page, size) {
				return url + "/leaveType/pagination?page=" + page + "&size="
						+ size;
			},
			GET_ALL_LEAVE_TYPES : function() {
				return url + "/leaveType/all";
			},
			GET_LEAVE_TYPES_COUNT : function() {
				return url + "/leaveType/count";
			},
			DELETE_LEAVE_TYPE_TITLE : function(id) {
				return url + "/leaveType/" + id;
			},
			ADD_LEAVE_TYPE : function() {
				return url + "/leaveType/";
			},
			UPDATE_LEAVE_TYPE : function(id) {
				return url + "/leaveType/" + id;
			},

			/* Designation urls */

			ADD_DESIGNATION : function() {
				return url + "/Designation/";

			},
			GET_DESIGNATION_LIST : function(page, size) {
				return url + "/Designation/pagination?page=" + page + "&size="
						+ size;

			},

			UPDATE_DESIGNATION : function(id) {
				return url + "/Designation/" + id;

			},
			DELETE_DESIGNATION : function(id) {
				return url + "/Designation/" + id;

			},
			GET_DESIGNATION_COUNT : function() {
				return url + "/Designation/count";
			},

			/* DEPARTMENT URLS */

			ADD_DEPARTMENT : function(id) {
				return url + "/divisionMaster/" + id + "/department";
			},
			UPDATE_DEPARTMENT : function(id, deptId) {
				return url + "/divisionMaster/" + id + "/department/" + deptId;
			},
			GET_DEPARTMENTLIST : function(page, size) {
				return url + "/department/paginatoin?page=" + page + "&size="
						+ size;
			},
			DELETE_DEPARTMENT : function(id) {
				return url + "/department/" + id;
			},
			GET_DEPARTMENT_COUNT : function() {
				return url + "/department/count";
			},
			GET_ALL_DIVISIONS : function() {
				return url + "/divisionMaster/all"
			},

			/* Language Details URLs */

			GET_LANGUAGE_LIST : function(page, size) {
				return url + "/language/pagination?page=" + page + "&size="
						+ size;
			},
			GET_LANGUAGES_COUNT : function() {
				return url + "/language/count";
			},
			DELETE_LANGUAGE : function(id) {
				return url + "/language/" + id;
			},
			ADD_LANGUAGE : function() {
				return url + "/language/";
			},
			UPDATE_LANGUAGE : function(id) {
				return url + "/language/" + id;
			},

			/* Holidays List URLs */

			GET_HOLIDAYS_LIST : function(page, size) {
				return url + "/holidayMaster/pagination?page=" + page
						+ "&size=" + size;
			},
			GET_HOLIDAYS_COUNT : function() {
				return url + "/holidayMaster/count";
			},
			DELETE_HOLIDAY : function(id) {
				return url + "/holidayMaster/" + id;
			},
			ADD_HOLIDAY : function(id, calenderYearId) {
				return url + "/location/" + id + "/calenderYear/"
						+ calenderYearId + "/holidays";
			},
			UPDATE_HOLIDAY : function(id, calenderYearId, holidayId) {
				return url + "/location/" + id + "/calenderYear/"
						+ calenderYearId + "/holiday/" + holidayId;
			},
			SEARCH_BY_LEAVEPERIODID_AND_STATE : function(dataurl) {
				return url + "/holidayMaster/search/" + dataurl;
			},
			SEARCH_BY_LEAVEPERIODID_AND_STATE_COUNT : function(dataurl) {
				return url + "/holidayMaster/search/count/" + dataurl;
			},
			/*
			 * WORKSHIFT URLS
			 */
			ADD_WORKSHIFT : function() {
				return url + "/WorkShift/"
			},
			GET_WORKSHIFT_LIST : function(page, size) {
				return url + "/WorkShift/pagination?page=" + page + "&size="
						+ size;
			},
			GET_WORKSHIFT_COUNT : function() {
				return url + "/WorkShift/count";

			},
			DELETE_WORKSHIFT : function(id) {
				return url + "/WorkShift/" + id;
			},
			UPDATE_WORKSHIFT : function(id) {
				return url + "/WorkShift/" + id;
			},

			/* Discipline Rule URLs */
			ADD_DISCIPLINE_RULE : function() {
				return url + "/disciplineRule/";
			},

			UPDATE_DISCIPLINE_RULE : function(id) {
				return url + "/disciplineRule/" + id;
			},

			GET_DISCIPLINE_RULES : function(page, size) {
				return url + "/disciplineRule/pagination?page=" + page
						+ "&size=" + size;
			},

			DELETE_DISCIPLINE_RULE : function(id) {
				return url + "/disciplineRule/" + id;
			},

			GET_DISCIPLINE_RULE_COUNT : function() {
				return url + "/disciplineRule/count";
			},
			FIND_ALL_DISCIPLINE_RULES : function() {
				return url + "/disciplineRule/all";
			},

			/* discipline action URLs */
			ADD_DISCIPLINE_ACTION : function(ruleId) {
				return url + "/disciplineRule/" + ruleId + "/disciplineAction";
			},
			GET_DISCIPLINE_ACTIONS : function(page, size) {
				return url + "/disciplineAction/pagination?page=" + page
						+ "&size=" + size;
			},
			UPDATE_DISCIPLINE_ACTION : function(ruleId, actionId) {
				return url + "/disciplineRule/" + ruleId + "/disciplineAction/"
						+ actionId;
			},
			DELETE_DISCIPLINE_ACTION : function(id) {
				return url + "/disciplineAction/" + id;
			},
			GET_DISCIPLINE_ACTION_COUNT : function() {
				return url + "/disciplineAction/count";
			},

			// **********************COMMON
			// URLS**********************************//

			GET_COUNTRIES : function() {
				return url + "/country/all";
			},
			GET_STATES_BY_COUNTRY_ID : function(id) {
				return url + "/country/" + id + "/states";
			},
			GET_DISTRICTS_BY_STATE_ID : function(id) {
				return url + "/state/" + id + "/districts";
			},
			GET_CITIES_BY_DISTRICT_ID : function(id) {
				return url + "/district/" + id + "/cities";
			},
			// ******************************EMPLOYEE
			// MODULE*******************************//

			// *****PERSONAL DETAILS*******/
			ADD_PERSONAL_DETAIL : function() {
				return url + "/employee/"
			},
			FIND_PERSON_BY_ID : function(id) {
				return url + "/employee/" + id;
			},
			GET_EMPLOYEE_LIST : function(page, size) {
				return url + "/employee/pagination/?page=" + page + "&size="
						+ size;
			},
			GET_ALL_ACTIVE_EMPLOYEES : function() {
				return url + "/employee/active";
			},
			GET_EMPLOYEE_COUNT : function() {
				return url + "/employee/count/";
			},
			ADD_CONTACT : function(id) {
				return url + "/employee/" + id + "/contact";
			},
			ADD_DEPENDENT : function(id) {
				return url + "/employee/" + id + "/dependent";
			},
			ADD_JOB_DETAILS : function(id) {
				return url + "/employee/" + id + "/jobdetails";
			},

			ADD_TERMINATION : function(id) {
				return url + "/employee/" + id + "/terminate";
			},

			ADD_REPORTING_TO : function(id) {
				return url + "/employee/" + id + "/reportTo";
			},
			// ////////JOBDETAIL RELATED URLS///////////

			GET_DEPARTMENTS_BY_DIVISION : function(id) {
				return url + "/divisionMaster/" + id + "/departments";
			},
			GET_DESIGNATIONS : function() {
				return url + "/Designation/all";
			},

			/**
			 * IMAGE_UPLOAD
			 * 
			 */
			POST_UPLOAD_IMAGE : function() {
				return url + "/upload/document";
			},
			POST_UPLOAD_ATTENDANCE: function() {
				return url + "/upload/attendanceUpload";
			},
			POST_ADD_DUCUMENTS : function(emmpId, category) {
				return url + "/employee/" + emmpId + "/document?category="
						+ category;
			},
			PUT_UPDATE_DOCUMENT : function(empId, documnetId) {
				return url + "/employee/" + empId + "/document/" + documnetId;
			},
			GET_DOCUMENTS : function(id, category) {
				return url + "/employee/" + id + "/documents?category="
						+ category;
			},
			DELET_DOCUMENT : function(id, documentId) {
				return url + "employee/" + id + "/document/" + documentId;
			},
			DELETE_DOCUMENT_BY_CAT_ID : function(docId) {
				return url + "/document/" + docId;
			},
			UPDATE_DOCUMENT_BY_CAT_ID : function(catId) {
				return url + "/documentCategoryMaster/" + catId + "/document";
			},
			GET_EMPLOYMENT_TYPES : function() {
				return url + "/employeeTypeMaster/all";
			},

			// ////update urls/////

			UPDATE_PERSON : function(id) {
				return url + "/employee/" + id;
			},
			FIND_EMPLOYEE_BY_ID : function(id) {
				return url + "/employee/" + id;
			},

			/* Employee language Proficiency */
			ADD_LANGUAGE_PROFICIENCY : function(id) {
				return url + "/employee/" + id + "/languageProficiency";
			},
			GET_LANGUAGE_PROFICIENCY_LIST : function(id) {
				return url + "/employee/" + id + "/languageProficies";
			},
			UPDATE_LANGUAGE_PROFICIENCY : function(empid, langid) {
				return url + "/employee/" + empid + "/languageProficiency/"
						+ langid;
			},
			DELETE_LANGUAGE_PROFICIENCY : function(empid, langid) {
				return url + "/employee/" + empid + "/languageProficiency/"
						+ langid;
			},

			/* Employee qualification level URLs */

			ADD_QUALIFICATION : function(id) {
				return url + "/employee/" + id + "/qualification";
			},

			GET_QUALIFICATION_LIST : function(id) {
				return url + "/employee/" + id + "/qualifications";
			},

			UPDATE_QUALIFICATION : function(eid, qid) {
				return url + "/employee/" + eid + "/qualification/" + qid;
			},
			UPDATE_CONTACT : function(id) {
				return url + "/employee/" + id + "/contact";
			},
			DELETE_QUALIFICATION : function(eid, qid) {
				return url + "/employee/" + eid + "/qualification/" + qid;
			},

			/* Emp Experience URLs */

			ADD_EXPERIENCE : function(id) {
				return url + "/employee/" + id + "/experience";
			},

			GET_EXPERIENCE_LIST : function(id) {
				return url + "/employee/" + id + "/experience";
			},

			UPDATE_EXPERIENCE : function(empid, expid) {
				return url + "/employee/" + empid + "/experience/" + expid;
			},

			DELETE_EXPERIENCE : function(empid, expid) {
				return url + "/employee/" + empid + "/experience/" + expid;
			},

			// /////dependent urls////
			GET_DEPENDENT_LIST : function(id) {
				return url + "/employee/" + id + "/dependents";
			},
			UPDATE_DEPENDENT : function(id, dependentId) {
				return url + "/employee/" + id + "/dependent/" + dependentId;
			},
			DELETE_DEPENDENT : function(id, dependentId) {
				return url + "/employee/" + id + "/dependent/" + dependentId;

			},
			// ///////usermanagement urls/////

			ADD_FEATURE : function() {
				return url + "/feature/add"
			},
			GET_FEATURES : function(page, size) {
				return url + "/feature/pagination/?page=" + page + "&size="
						+ size;
			},
			GET_COUNT : function() {
				return url + "/feature/count";
			},
			ADD_ROLE : function() {
				return url + "/role/add"
			},
			GET_ROLES : function() {
				return url + "/role/all";
			},
			UPDATE_ROLE : function(id) {
				return url + "/role/" + id;
			},
			GET_ALL_FEATURES : function() {
				return url + "/feature/all";
			},

			GET_FEATURE_ACTIONS_BY_ROLE_ID : function(roleId) {
				return url + "/role/" + roleId + "/featureActions";
			},
			/* ATTENDANCE */
			GET_ATTENDANCE_LIST : function(date) {
				return url + "/attendance/byDate?date=" + date;
			},
			UPLOAD_ATTENDANCE : function() {
				return url + "/attendance/upload";
			},
			UPDATE_ATTENDANCE : function(id) {
				return url + "/attendance/" + id;
			},
			ATTENDANCE_SEARCH_FOR_EMPLOYEE : function(dataUrl) {
				return url + "/employee/allEmployeeAttendanceSearch" + dataUrl;
			},
			ATTENDANCE_SEARCH_FOR_EMPLOYEE_COUNT : function(dataUrl) {
				return url + "/employee/allEmployeeAttendanceSearch/count"
						+ dataUrl;
			},
			ATTENDANCE_SEARCH_FOR_REPORTEE : function(superiorId, dataUrl) {
				return url + "/employee/" + superiorId
						+ "/reportieesAttendance" + dataUrl;
			},
			ATTENDANCE_SEARCH_FOR_REPORTEE_COUNT : function(superiorId, dataUrl) {
				return url + "/employee/" + superiorId
						+ "/reportieesAttendance/count" + dataUrl;
			},

			// //COUNTRY URLS////
			GET_COUNTRY_LIST : function(page, size) {
				return url + "/country/pagination?page=" + page + "&size="
						+ size;
			},
			GET_ALL_COUNTRIES : function() {
				return url + "/country/all";
			},
			ADD_COUNTRY : function() {
				return url + "/country/";
			},
			UPDATE_COUNTRY : function(id) {
				return url + "/country/" + id;
			},

			GET_COUNTRIES_COUNT : function() {
				return url + "/country/count";
			},

			GET_ALL_STATES : function(id) {
				return url + "/country/" + id + "/states"
			},
			ADD_STATE : function(id) {
				return url + "/country/" + id + "/state";
			},
			UPDATE_STATE : function(countryId, stateId) {
				return url + "/country/" + countryId + "/state/" + stateId;
			},
			GET_ALL_DISTRICT : function(id) {
				return url + "/state/" + id + "/districts";
			},
			ADD_DISTRICT : function(stateId) {
				return url + "/state/" + stateId + "/district";
			},
			UPDATE_DISTRICT : function(stateId, districtId) {
				return url + "/state/" + stateId + "/district/" + districtId;
			},

			// /USER LOGIN
			DO_LOGIN : function() {
				return url + "/user/login";

			},

			// DOCUMENT CATEGORY MODULE
			GET_ALL_DOCUMENT_CATEGORIES : function(page, size) {
				return url + "/documentCategoryMaster/pagination?page=" + page
						+ "&size=" + size;

			},
			ADD_USER : function() {
				return url + "/user/";
			},
			GET_USERS : function(page, size) {
				return url + "/user/pagination?page=" + page + "&size=" + size;
			},
			UPDATE_USER : function(id) {
				return url + "/user/" + id;
			},

			// //feature category///////////
			ADD_FEATURE_CATEGORY : function() {
				return url + "/featureCategory/";
			},
			UPDATE_FEATURE_CATEGORY : function(id) {
				return url + "/featureCategory/" + id;
			},
			GET_FEATURE_CATEGORIES : function(page, size) {
				return url + "/featureCategory/pagination?page=" + page
						+ "&size=" + size;
			},
			GET_FEATURE_CATEGORY_COUNT : function() {
				return url + "/featureCategory/count";
			},
			GET_ALL_FETURE_CATEGORIES : function() {
				return url + "/featureCategory/all";
			},
			// /////status Aprove*****
			SET_STATUS : function(id) {
				return url + "/employee/" + id + "/active"

			},

			/* LeaveManagement URLs */

			ADD_LEAVE_ENTITLEMENT : function(dataUrl) {
				return url + "/leaveEntitlement/" + dataUrl;
			},
			GET_LEAVE_ENTITLEMENT_LIST : function(page, size) {
				return url + "/leaveEntitlement/pagination?page=" + page
						+ "&size=" + size;
			},
			GET_ATTENDANCE_LIST_BY_EMP_ID : function(id) {
				return url + "/employee/" + id + "/attendances";
			},
			GET_LEAVE_REQUEST_LIST_BY_EMP_ID : function(id) {
				return url + "/employee/" + id + "/leaveRequests";
			},
			GET_LEAVE_REQUEST_LIST_COUNT : function(id) {
				return url + "/employee/" + id + "/leaverequests/count";
			},
			APPLY_FOR_LEAVE : function(id) {
				return url + "/employee/" + id + "/applyLeave";
			},

			APPROVE_LEAVE_REQUEST : function(id) {
				return url + "/leaveRequest/" + id;
			},

			GET_ALL_LEAVE_ENTITLEMENTS : function(id) {
				return url + "/employee/" + id + "/leaveEntitlement/all";
			},
			// /**********ACT URLS********************

			ADD_ACT : function() {
				return url + "/act/"
			},
			EDIT_ACT : function(id) {
				return url + "/act/" + id;
			},

			DELETE_ACT : function(id) {
				return url + "/act/" + id;
			},
			GET_ALL_ACTS : function() {
				return url + "/act/"
			},
			// *********ACTSHEDULEURLS*********
			ADD_ACTSHEDULE : function(actId) {
				return url + "/act/" + actId + "/actShedule"
			},

			GET_ALL_ACT_SCHEDULES : function() {
				return url + "/actShedule/all";
			},
			EDIT_ACTSHEDULE : function(actId, actSheduleId) {
				return url + "/act/" + actId + "/actshedule/" + actSheduleId;
			},

			DELETE_ACTSHEDULE : function(id) {
				return url + "/actShedule/" + id;
			},
			GET_ALL_ACTSHEDULE : function(id) {
				return url + "/act/" + id + "/allActShedules";
			},

			/* Location Department */
			ADD_LOCATION_DEPT : function() {
				return url + "/localDepartmet/";
			},

			UPDATE_LOCATION_DEPT : function(id, deptId) {
				return url + "/location/" + id + "/department/" + deptId;
			},
			DELETE_LOCATION_DEPT : function(id) {
				return url + "/localDepartmet/" + id;
			},

			GET_LOCATION_DEPT : function(page, size) {
				return url + "/localDepartmet/pagination?page=" + page
						+ "&size=" + size;
			},

			GET_ALL_LOCATION_DEPTS : function(id) {
				return url + "/location/" + id + "/departments";
			},

			GET_LOCATION_DEPT_COUNT : function() {
				return url + "/localDepartmet/count";
			},
			// ***********Location Urls*******

			ADD_LOCATION : function() {
				return url + "/location/";
			},
			UPDATE_LOCATION : function(id) {
				return url + "/location/" + id;
			},
			GET_ALL_LOCATIONS : function() {
				return url + "/location/all"
			},
			DELETE_LOCATION : function(id) {
				return url + "/location/" + id;
			},
			UPDATE_DOCUMENT_BY_ID : function(id) {
				return url + "/documentCategoryMaster/" + id + "/document"
			},
			GET_DEPARTMENTS_BY_LOCATION : function(id) {
				return url + "/location/" + id + "/departments"
			},
			/* Employee Reportses url */
			GET_REPORTIES : function(id) {
				return url + "/employee/" + id + "/reporties";
			},
			GET_ALL_LEAVEREQUESTS : function() {
				return url + "/leaveRequest/all";
			},
			ADD_LOCATION_WISE_ACT : function(id, sheduleId) {
				return url + "/localDepartmet/" + id + "/shedule/" + sheduleId
						+ "/mapping";
			},
			GET_LOCATION_WISE_ACTS_BY_PAGINATION : function(page, size) {
				return url
						+ "/localDepartmet/locationwiseActs/pagination?page="
						+ page + "&size=" + size;
			},
			GET_LOCATION_WISE_ACTS_COUNT : function() {
				return url + "/localDepartmet/locationwiseActs/count";
			},
			GET_ALL_ACTIVE_EMPLOYEES : function() {
				return url + "/employee/activeEmployees"
			},
			ADD_DEPARTMENT_BY_LOCATION_WISE : function(id) {
				return url + "/location/" + id + "/department"
			},

			// /////////////////////************CRM
			// URLS**********\\\\\\\\\\\\\\\\\\\\\\\\\\\
			/* Function Hall URLS */

			GET_ALL_EMPLOYEES_EXCEPT_BY_ID : function(id) {
				return url + "/employee/" + id + "/all"
			},

			SEARCH_EMP_LEAVE_REQUEST_BY_EMP_ID : function(dataurl) {
				return url + "/leaveRequest/search/" + dataurl;
			},
			SEARCH_LEAVE_ENTITLEMENT : function(dataUrl) {
				return url + "/leaveEntitlement/search" + dataUrl;
			},
			SEARCH_LEAVE_ENTITLEMENT_COUNT : function(dataUrl) {
				return url + "/leaveEntitlement/search/count" + dataUrl;
			},
			CANCEL_LEAVE_REQUEST : function(id) {
				return url + "/leaveRequest/" + id + "/cancel"
			},

			GET_COUNT_EMPLOYEE_LEAVE_REQUESTS_SEARCH : function(dataurl) {
				return url + "/leaveRequest/search/count/" + dataurl;
			},

			GET_ATTENDANCE_COUNT_BY_EMP_ID : function(id) {
				return url + "/employee/" + id + "/attendance/count";
			},

			GET_MY_LEAVES_BY_CALENDAR_ID : function(empId, calendarId, page,
					size) {
				return url + "/employee/" + empId
						+ "/leaveEntitleMent?calendarId=" + calendarId
						+ "&page=" + page + "&size=" + size;
			},
			SEARCH_LEAVEREQUEST_BY_REPORTEES : function(superiorId, dataUrl) {
				return url + "/leaveRequest/search/reporties/" + superiorId
						+ dataUrl;
			},
			SEARCH_LEAVEREQUEST_BY_REPORTEES_COUNT : function(superiorId,
					dataUrl) {
				return url + "/leaveRequest/search/count/reporties/"
						+ superiorId + dataUrl;
			},
			GET_COUNT_USERS : function() {
				return url + "/user/count";
			},
			MONTLY_ATTENDANCE_SEARCH : function(id, dataUrl) {
				return url + "/employee/" + id + "/monthlyAttendance" + dataUrl
			},
			MONTLY_ATTENDANCE_SEARCH_COUNT : function(id, dataUrl) {
				return url + "/employee/" + id + "/monthlyAttendance/count"
						+ dataUrl
			},
			UPDATE_LEAVE_ENTITLEMENT : function(id) {
				return url + "/leaveEntitlement/" + id
			},
			SEARCH_LOCATION_WISE_ACT : function(dataUrl) {
				return url + "/localDepartmet/search/" + dataUrl;
			},
			SEARCH_LOCATION_WISE_ACT_COUNT : function(dataUrl) {
				return url + "/localDepartmet/search/count/" + dataUrl;
			},
			GET_EMPLOYEE_LEAVE_REQUEST_PAGE_AND_SIZE : function(page, size) {
				return url + "/leaveRequest/pagination?page=" + page + "&size="
						+ size;
			},
			GET_SUPERIOR : function(id) {
				return url + "/employee/" + id + "/superior";
			},
			SEARCH_STATES : function(dataUrl) {
				return url + "/state/search/" + dataUrl;
			},
			SEARCH_STATES_COUNT : function(CountUrl) {
				return url + "/state/search/count/" + CountUrl;
			},

			SEARCH_DISTRICTS : function(dataUrl) {
				return url + "/district/search/" + dataUrl;
			},
			SEARCH_DISTRICTS_COUNT : function(CountUrl) {
				return url + "/district/search/count/" + CountUrl;
			},
			GET_LEAVE_ENTITLEMENTS_LEAVEPERIOD_AND_EMPLOYEE_ID : function(
					employeeId, leavePeriodId) {
				return url + "/employee/" + employeeId + "/leavePeriod/"
						+ leavePeriodId;
			},
			GET_ALL_SALES_MANAGERS : function() {
				return url + "/employee/salesManagers";
			},
			GET_ALL_SALES_REPRESENTATIVES : function() {
				return url + "/employee/salesRepresentatives"
			},
			SERACH_SALES_REPRESENTATIVES : function(dataUrl) {
				return url + "/employee/search/salesRep/" + dataUrl;
			},
			SERACH_SALES_REPRESENTATIVES_COUNT : function(dataUrl) {
				return url + "/employee/search/salesRep/count/" + dataUrl;
			},
			SEARCH_ACTSHEDULES : function(dataUrl) {
				return url + "/act/search/actShedules/" + dataUrl;
			},
			GET_LCOATIONS_BY_SALES_REP_ID : function(salesRepId) {
				return url + "/employee/" + salesRepId + "/locations";
			},
			UPDATE_PERSON_FOR_SALES_REPRESENTATIVE : function(empId) {
				return url + "/employee/" + empId + "/locations/";
			},
			SEARCH_EMPLOYEE : function(dataUrl) {
				return url + "/employee/search/" + dataUrl;
			},
			SEARCH_EMPLOYEE_COUNT : function(countUrl) {
				return url + "/employee/search/count/" + countUrl;
			},
			GET_VEHICLE_MODELS_AND_LOCATIONS_BY_EMP_ID : function(employeeId) {
				return url + "/employee/" + employeeId + "/locationsAndModels"
			},

			GET_DATES_DIFFERENCE : function(fromDate, toDate) {
				return url + "/DateDifference/?fromDate=" + fromDate
						+ "&toDate=" + toDate;
			},
			GET_ACTIVE_AND_NOT_NULL_USERS:function(){
				return url+"/employee/activeAndusersNotNullemps"
			}
		}
	}

};

app.constant('HRM_CONFIG', hrmConfig());
