package com.srmt.model.sales.tdv;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sales_invoice_dump")
public class InvoiceDump {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String invoiceId;
	private String customerName;
	private LocalDate invoiceDate;
	private String productLine;
	private String chassisNo;
	private String totalInvoiceAmount;
	private String tmInvoice;
	private String invoiceStatus;
	private LocalDate tmInvoiceDate;
	private String financier;
	private String hypothecation;
	private String parentProductLine;
	private String orderNo;
	private LocalDate orderDate;
	public String getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public LocalDate getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(LocalDate invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getProductLine() {
		return productLine;
	}
	public void setProductLine(String productLine) {
		this.productLine = productLine;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getTotalInvoiceAmount() {
		return totalInvoiceAmount;
	}
	public void setTotalInvoiceAmount(String totalInvoiceAmount) {
		this.totalInvoiceAmount = totalInvoiceAmount;
	}
	public String getTmInvoice() {
		return tmInvoice;
	}
	public void setTmInvoice(String tmInvoice) {
		this.tmInvoice = tmInvoice;
	}
	public String getInvoiceStatus() {
		return invoiceStatus;
	}
	public void setInvoiceStatus(String invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}
	public LocalDate getTmInvoiceDate() {
		return tmInvoiceDate;
	}
	public void setTmInvoiceDate(LocalDate tmInvoiceDate) {
		this.tmInvoiceDate = tmInvoiceDate;
	}
	public String getFinancier() {
		return financier;
	}
	public void setFinancier(String financier) {
		this.financier = financier;
	}
	public String getHypothecation() {
		return hypothecation;
	}
	public void setHypothecation(String hypothecation) {
		this.hypothecation = hypothecation;
	}
	public String getParentProductLine() {
		return parentProductLine;
	}
	public void setParentProductLine(String parentProductLine) {
		this.parentProductLine = parentProductLine;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public LocalDate getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

}
