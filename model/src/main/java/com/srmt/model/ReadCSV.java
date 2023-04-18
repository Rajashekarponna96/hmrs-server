package com.srmt.model;

import java.io.BufferedReader; 
import java.io.IOException; 
import java.nio.charset.StandardCharsets; 
import java.nio.file.Files; 
import java.nio.file.Path; 
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List; 

/** Simple Java program to read CSV file in Java. * */ 

public class ReadCSV { 
	public static void main(String... args) { 
		System.out.println("OUTPUT.....\n");
		List<InvoiceDump> invoicesDumpList = readInvoicesFromCSV("C:\\Users\\Arbiva\\Desktop\\srmt-ui\\sample.csv"); 
		//System.out.println("Read file in main .......");
		// let's print all the person read from CSV file 
		for (InvoiceDump dump : invoicesDumpList) { 
			System.out.println(dump); 
		} 
	} 
	
	private static List<InvoiceDump> readInvoicesFromCSV(String fileName) { 
		List<InvoiceDump> invoices = new ArrayList<>(); 
		Path pathToFile = Paths.get(fileName); 
		// create an instance of BufferedReader 
		try (BufferedReader br = Files.newBufferedReader(pathToFile, StandardCharsets.US_ASCII)) { 
			// read the first line from the file 
			String line = br.readLine(); 
			// loop until all lines are read 
			String[] attributes = {};
			while (line != null) { 
				// use string.split to load a string array with the values from 
				// each line of 
				// the file, using a comma as the delimiter 
				attributes = line.split(","); 
				
				/*InvoiceDump invDump = createInvoiceDump(attributes); 
				// adding invDump into ArrayList 
				invoices.add(invDump); 
				// read next line before looping 
				// if end of file reached, line would be null 
				line = br.readLine(); */
			} 
			
			for(int i=0; i<attributes.length; i++)
				System.out.println(attributes[i]);
			
		}catch (IOException ioe) { 
			ioe.printStackTrace(); 
		}
		
		return invoices; 
	} 
	
	private static InvoiceDump createInvoiceDump(String[] metadata) { 
		String invoiceNo = metadata[0]; 
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		Date actInvoiceDate = new Date(metadata[1]);
		String invoiceDate = format.format(actInvoiceDate);
		String invoiceAmt = metadata[2]; 
		// create and return invoice of this metadata 
		return new InvoiceDump(invoiceNo, invoiceDate, invoiceAmt); 
	} 
} 

class InvoiceDump { 
	
	private String invNo; 
	private String invDate; 
	private String invAmt; 
	
	public String getInvNo() {
		return invNo;
	}

	public void setInvNo(String invNo) {
		this.invNo = invNo;
	}

	public String getInvDate() {
		return invDate;
	}

	public void setInvDate(String invDate) {
		this.invDate = invDate;
	}

	public String getInvAmt() {
		return invAmt;
	}

	public void setInvAmt(String invAmt) {
		this.invAmt = invAmt;
	}

	public InvoiceDump(String invNo, String invDate, String invAmt) { 
		this.invNo = invNo; 
		this.invDate = invDate; 
		this.invAmt = invAmt;
	} 
	
	@Override public String toString() { 
		return "InvoiceDump [Inv No.=" + invNo + ", Inv Date=" + invDate + ", Inv Amount=" + invAmt + "]"; 
	} 
}