package com.srmt.tdv.service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.employee.Document;
import com.srmt.model.sales.tdv.SalesOrderTdvDump;
import com.srmt.repository.tdv.repository.OutPutOrderDumpRepository;
@Service
public class OutPutOrderDumpServiceimpl implements outPutOrderDumpService{
	
	@Autowired
	private OutPutOrderDumpRepository outPutOrderDumpRepository;

	/*@Override
	public void uploadOutputOrderDump(Document document) {
		List<InvoiceDump> invoicesDumpList = readInvoicesFromCSV("C:\\Users\\ARBIVAB\\Desktop\\Requirements\\TDV\\inv-csv-test.csv"); 
		
		String csvFile = document.toString();
		BufferedReader br = null;
		String line = "";
		String cvsSplitBy = ",";
		
		
	List<OutputOrdersDump> outputOrderDumps=new ArrayList<OutputOrdersDump>();
	
		

		try {

			br = new BufferedReader(new FileReader(csvFile));
			while ((line = br.readLine()) != null) {

			        // use comma as separator
				String[] outputOrderdumpCol = line.split(cvsSplitBy);
				OutputOrdersDump outputOrderDump=new OutputOrdersDump();
				DateTimeFormatter datetimeformatter = DateTimeFormatter
						.ofPattern("dd-MM-yyyy HH:mm:ss");
				
				LocalDateTime date = LocalDateTime.parse(outputOrderdumpCol[0], datetimeformatter);
				outputOrderDump.setOrderDate(date);
				outputOrderDump.setOrder(outputOrderdumpCol[1]);
				outputOrderDump.setOrderType(outputOrderdumpCol[2]);
				outputOrderDump.setOrderCategory(outputOrderdumpCol[3]);
				outputOrderDump.setOrderStatus(outputOrderdumpCol[4]);
				outputOrderDump.setPurchaseOrder(outputOrderdumpCol[5]);
				outputOrderDump.setQuatityRequested(outputOrderdumpCol[6]);
				outputOrderDump.setQuantityInvoiced(outputOrderdumpCol[7]);
				outputOrderDump.setAllocatedQuantity(outputOrderdumpCol[8]);
				outputOrderDump.setFinanceAmount(outputOrderdumpCol[9]);
				outputOrderDump.setTotalOrderValue(outputOrderdumpCol[10]);
				outputOrderDump.setTotalPaymentsReceived(outputOrderdumpCol[11]);
				outputOrderDump.setBalancePayment(outputOrderdumpCol[12]);
				outputOrderDump.setOtherCharges(outputOrderdumpCol[13]);
				outputOrderDump.setSalesTeam(outputOrderdumpCol[14]);
				outputOrderDump.setFinancedBy(outputOrderdumpCol[15]);
				outputOrderDump.setHypothecation(outputOrderdumpCol[16]);
				outputOrderDump.setLob(outputOrderdumpCol[17]);
				outputOrderDump.setParentProductLine(outputOrderdumpCol[18]);
				outputOrderDump.setProductLine(outputOrderdumpCol[19]);
				outputOrderDump.setOpportunity(outputOrderdumpCol[20]);
				
				outputOrderDumps.add(outputOrderDump);

				System.out.println("Order [orderDate= " + outputOrderdumpCol[2] 
	                                 + " , order#=" + outputOrderdumpCol[3] + "]");

			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		outPutOrderDumpRepository.save(outputOrderDumps);
		System.out.println("Done");
	  }*/
	
	
	
	
	private  SalesOrderTdvDump createOutPutOrderDump(String[] outputOrderdumpCol) {
		
		SalesOrderTdvDump outputOrderDump=new SalesOrderTdvDump();
		DateTimeFormatter datetimeformatter = DateTimeFormatter
				.ofPattern("dd-MM-yyyy HH:mm:ss");
		
		LocalDateTime date = LocalDateTime.parse(outputOrderdumpCol[0], datetimeformatter);
		outputOrderDump.setOrderDate(date);
		outputOrderDump.setOrder(outputOrderdumpCol[1]);
		outputOrderDump.setOrderType(outputOrderdumpCol[2]);
		outputOrderDump.setOrderCategory(outputOrderdumpCol[3]);
		outputOrderDump.setOrderStatus(outputOrderdumpCol[4]);
		outputOrderDump.setPurchaseOrder(outputOrderdumpCol[5]);
		outputOrderDump.setQuatityRequested(outputOrderdumpCol[6]);
		outputOrderDump.setQuantityInvoiced(outputOrderdumpCol[7]);
		outputOrderDump.setAllocatedQuantity(outputOrderdumpCol[8]);
		outputOrderDump.setFinanceAmount(outputOrderdumpCol[9]);
		outputOrderDump.setTotalOrderValue(outputOrderdumpCol[10]);
		outputOrderDump.setTotalPaymentsReceived(outputOrderdumpCol[11]);
		outputOrderDump.setBalancePayment(outputOrderdumpCol[12]);
		outputOrderDump.setOtherCharges(outputOrderdumpCol[13]);
		outputOrderDump.setSalesTeam(outputOrderdumpCol[14]);
		outputOrderDump.setFinancedBy(outputOrderdumpCol[15]);
		outputOrderDump.setHypothecation(outputOrderdumpCol[16]);
		outputOrderDump.setLob(outputOrderdumpCol[17]);
		outputOrderDump.setParentProductLine(outputOrderdumpCol[18]);
		outputOrderDump.setProductLine(outputOrderdumpCol[19]);
		outputOrderDump.setOpportunity(outputOrderdumpCol[20]);
		outputOrderDump.setContactFullAdress(outputOrderdumpCol[21]);
		outputOrderDump.setContactPhone(outputOrderdumpCol[22]);
		outputOrderDump.setCrnNumber(outputOrderdumpCol[23]);
		outputOrderDump.setAccount(outputOrderdumpCol[24]);
		outputOrderDump.setAccountFullAddress(outputOrderdumpCol[25]);
		outputOrderDump.setAccountPhone(outputOrderdumpCol[26]);
		outputOrderDump.setAccountLocation(outputOrderdumpCol[27]);
		outputOrderDump.setArnNumber(outputOrderdumpCol[28]);
		outputOrderDump.setAccountTypae(outputOrderdumpCol[29]);
		
		return outputOrderDump;
		
	}


	@Override
	public void uploadOutputOrderDump(Document document) {
		List<SalesOrderTdvDump> outputOrderDumps=new ArrayList<>();
		
		Path pathToFile = Paths.get(document.getPath()); 
		
		try (BufferedReader br = Files.newBufferedReader(pathToFile, StandardCharsets.US_ASCII)) { 
			// read the first line from the file 
			String line = br.readLine(); 
			// loop until all lines are read 
			while (line != null) { 
				// use string.split to load a string array with the values from 
				// each line of 
				// the file, using a comma as the delimiter 
				String[] attributes = line.split(","); 
				SalesOrderTdvDump outputOrderDump = createOutPutOrderDump(attributes); 
				// adding invDump into ArrayList 
				outputOrderDumps.add(outputOrderDump); 
				// read next line before looping 
				// if end of file reached, line would be null 
				line = br.readLine(); 
			} 
		}catch (IOException ioe) { 
			ioe.printStackTrace(); 
		}
		
		outPutOrderDumpRepository.save(outputOrderDumps);
		
	} 
	
		
	}


