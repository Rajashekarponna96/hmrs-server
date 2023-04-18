package com.srmt.controller.uploads;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.srmt.config.FileConfig;
import com.srmt.model.hrms.employee.Document;

@RestController
@RequestMapping(value = "/upload")
public class UploadController {

	@Autowired
	private FileConfig fileConfig;

	@RequestMapping(value = "/document", method = RequestMethod.POST)
	public Document uploadDocument(@RequestParam("file") MultipartFile file)
			throws IOException {
		
		long size = file.getSize();
		String extension = FilenameUtils.getExtension(file
				.getOriginalFilename());
		String fileName = file.getOriginalFilename();
		if ((extension.equalsIgnoreCase(".pdf") || extension
				.equalsIgnoreCase(".doc"))) {

			throw new RuntimeException("Please select file with .pdf or .doc");
		}
		String random = UUID.randomUUID().toString();

		fileName = random;

		String filePath = fileConfig.getPath() + random + "." + extension;
		InputStream inputStream = null;
		OutputStream outputStream = null;
		inputStream = file.getInputStream();
		outputStream = new FileOutputStream(filePath);
		int readBytes = 0;
		byte[] buffer = new byte[10000];
		while ((readBytes = inputStream.read(buffer, 0, 10000)) != -1) {
			outputStream.write(buffer, 0, readBytes);
		}
		outputStream.close();
		inputStream.close();
		Document document = new Document();
		document.setFileUnique(fileName);
		document.setType(extension);
		document.setPath(filePath);
		document.setSize(size);
		return document;
	}
	
	@RequestMapping(value = "/attendanceUpload", method = RequestMethod.POST)
	public Document uploadAttendanceDocument(@RequestParam("file") MultipartFile file)
			throws IOException {
		
		long size = file.getSize();
		String extension = FilenameUtils.getExtension(file
				.getOriginalFilename());
		String fileName = file.getOriginalFilename();
		if ((!extension.equalsIgnoreCase("xlsx"))) {
			throw new RuntimeException("Invalid file format. Please select only .xlsx format");
		}
		String random = UUID.randomUUID().toString();

		fileName = random;

		String filePath = fileConfig.getPath() + random + "." + extension;
		InputStream inputStream = null;
		OutputStream outputStream = null;
		inputStream = file.getInputStream();
		outputStream = new FileOutputStream(filePath);
		int readBytes = 0;
		byte[] buffer = new byte[10000];
		while ((readBytes = inputStream.read(buffer, 0, 10000)) != -1) {
			outputStream.write(buffer, 0, readBytes);
		}
		outputStream.close();
		inputStream.close();
		Document document = new Document();
		document.setFileUnique(fileName);
		document.setType(extension);
		document.setPath(filePath);
		document.setSize(size);
		return document;
	}

}
