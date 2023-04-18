package com.srmt.model;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class CSVReader {

	public static void main(String[] args) {

		CSVReader obj = new CSVReader();
		obj.run();

	}

	public void run() {

		String csvFile = "C:\\Users\\Arbiva\\Downloads\\dump\\output_Invoices_tdv_kkd.csv";
		BufferedReader br = null;
		String line = "";
		String cvsSplitBy = ",";

		try {

			br = new BufferedReader(new FileReader(csvFile));
			while ((line = br.readLine()) != null) {

				// use comma as separator
				String[] fields = line.split(cvsSplitBy);
				for(int i=0; i<fields.length; i++){
					byte[] b = fields[i].getBytes("ISO-8859-1");
					String value = new String(b, "UTF-8"); 
					System.out.print(value+"\n");
					
				}
				
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

		System.out.println("Done");
	}

}
