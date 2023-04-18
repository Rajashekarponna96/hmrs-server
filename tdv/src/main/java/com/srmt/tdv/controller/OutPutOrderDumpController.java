package com.srmt.tdv.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.employee.Document;
import com.srmt.tdv.service.outPutOrderDumpService;
@RestController
@RequestMapping("/outPutOrderDump")
public class OutPutOrderDumpController {
	
	
	@Autowired
	private outPutOrderDumpService outPutOrderDumpService ;
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public void uploadOutputOrderDump(@RequestBody Document document)
			throws IOException {

		outPutOrderDumpService.uploadOutputOrderDump(document);
	}
	

}
