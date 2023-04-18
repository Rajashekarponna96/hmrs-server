package com.srmt.model.sales.tdv;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.rest.model.IEntity;


@Audited
@Entity
@Access(AccessType.PROPERTY)
@Table(name = "sales_order_tdv_dump")
@EntityListeners(AuditingEntityListener.class)
public class SalesOrderTdvDump implements Serializable,IEntity<SalesOrderTdvDump>{
	
	private static final long serialVersionUID = 7041630181620022656L;

	
	private Long id;

	@CreatedDate
	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime orderDate;
	
	
	private String order;
	
	private String orderType;
	
	
	private String orderCategory;
	
	private String orderStatus;
	
	private String purchaseOrder;
	
	private String quatityRequested;
	
	private String quantityInvoiced;
	
	private String allocatedQuantity;
	
	
	private String financeAmount;
	
	
	private String totalOrderValue;
	
	private String totalPaymentsReceived;
	
	private String balancePayment;
	
	
	private String otherCharges;
	
	
	private String salesTeam;
	
	
	private String financedBy;
	
	private String hypothecation;
	
	
	private String lob;
	
	private String parentProductLine;
	
	
	private String productLine;
	
	
	private String opportunity;
	private String contactName;
	private String contactFullAdress;
	private String contactPhone;
	private String crnNumber;
	private String account;
	private String accountFullAddress;
	
	private String accountPhone;
	private String accountLocation;
	private String arnNumber;
	private String accountTypae;
	@Override
	public void copy(SalesOrderTdvDump toEntity) {
		toEntity.setId(id);
		toEntity.setOrder(order);
		toEntity.setOrderType(orderType);
		toEntity.setOrderCategory(orderCategory);
		toEntity.setOrderStatus(orderStatus);
		toEntity.setPurchaseOrder(purchaseOrder);
		toEntity.setQuatityRequested(quatityRequested);
		toEntity.setQuantityInvoiced(quantityInvoiced);
		toEntity.setAllocatedQuantity(allocatedQuantity);
		toEntity.setFinanceAmount(financeAmount);
		toEntity.setTotalOrderValue(totalOrderValue);
		toEntity.setTotalPaymentsReceived(totalPaymentsReceived);
		toEntity.setBalancePayment(balancePayment);
		toEntity.setOtherCharges(otherCharges);
		toEntity.setSalesTeam(salesTeam);
		toEntity.setFinancedBy(financedBy);
		toEntity.setHypothecation(hypothecation);
		toEntity.setLob(lob);
		toEntity.setParentProductLine(parentProductLine);
		toEntity.setProductLine(parentProductLine);
		toEntity.setOpportunity(opportunity);
		toEntity.setContactName(contactName);
		toEntity.setContactFullAdress(contactFullAdress);
		toEntity.setAccountPhone(accountPhone);
		toEntity.setCrnNumber(crnNumber);
		toEntity.setAccount(account);
		toEntity.setAccountFullAddress(accountFullAddress);
		toEntity.setAccountPhone(accountPhone);
		toEntity.setAccountLocation(accountLocation);
		toEntity.setArnNumber(arnNumber);
		toEntity.setAccountTypae(accountTypae);
	}
	public LocalDateTime getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getOrderType() {
		return orderType;
	}
	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}
	public String getOrderCategory() {
		return orderCategory;
	}
	public void setOrderCategory(String orderCategory) {
		this.orderCategory = orderCategory;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public String getPurchaseOrder() {
		return purchaseOrder;
	}
	public void setPurchaseOrder(String purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}
	public String getQuatityRequested() {
		return quatityRequested;
	}
	public void setQuatityRequested(String quatityRequested) {
		this.quatityRequested = quatityRequested;
	}
	public String getQuantityInvoiced() {
		return quantityInvoiced;
	}
	public void setQuantityInvoiced(String quantityInvoiced) {
		this.quantityInvoiced = quantityInvoiced;
	}
	public String getAllocatedQuantity() {
		return allocatedQuantity;
	}
	public void setAllocatedQuantity(String allocatedQuantity) {
		this.allocatedQuantity = allocatedQuantity;
	}
	public String getFinanceAmount() {
		return financeAmount;
	}
	public void setFinanceAmount(String financeAmount) {
		this.financeAmount = financeAmount;
	}
	public String getTotalOrderValue() {
		return totalOrderValue;
	}
	public void setTotalOrderValue(String totalOrderValue) {
		this.totalOrderValue = totalOrderValue;
	}
	public String getTotalPaymentsReceived() {
		return totalPaymentsReceived;
	}
	public void setTotalPaymentsReceived(String totalPaymentsReceived) {
		this.totalPaymentsReceived = totalPaymentsReceived;
	}
	public String getBalancePayment() {
		return balancePayment;
	}
	public void setBalancePayment(String balancePayment) {
		this.balancePayment = balancePayment;
	}
	public String getOtherCharges() {
		return otherCharges;
	}
	public void setOtherCharges(String otherCharges) {
		this.otherCharges = otherCharges;
	}
	public String getSalesTeam() {
		return salesTeam;
	}
	public void setSalesTeam(String salesTeam) {
		this.salesTeam = salesTeam;
	}
	public String getFinancedBy() {
		return financedBy;
	}
	public void setFinancedBy(String financedBy) {
		this.financedBy = financedBy;
	}
	public String getHypothecation() {
		return hypothecation;
	}
	public void setHypothecation(String hypothecation) {
		this.hypothecation = hypothecation;
	}
	public String getLob() {
		return lob;
	}
	public void setLob(String lob) {
		this.lob = lob;
	}
	public String getParentProductLine() {
		return parentProductLine;
	}
	public void setParentProductLine(String parentProductLine) {
		this.parentProductLine = parentProductLine;
	}
	public String getProductLine() {
		return productLine;
	}
	public void setProductLine(String productLine) {
		this.productLine = productLine;
	}
	public String getOpportunity() {
		return opportunity;
	}
	public void setOpportunity(String opportunity) {
		this.opportunity = opportunity;
	}
	public String getContactName() {
		return contactName;
	}
	public void setContactName(String contactName) {
		this.contactName = contactName;
	}
	public String getContactFullAdress() {
		return contactFullAdress;
	}
	public void setContactFullAdress(String contactFullAdress) {
		this.contactFullAdress = contactFullAdress;
	}
	public String getContactPhone() {
		return contactPhone;
	}
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}
	public String getCrnNumber() {
		return crnNumber;
	}
	public void setCrnNumber(String crnNumber) {
		this.crnNumber = crnNumber;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getAccountFullAddress() {
		return accountFullAddress;
	}
	public void setAccountFullAddress(String accountFullAddress) {
		this.accountFullAddress = accountFullAddress;
	}
	public String getAccountPhone() {
		return accountPhone;
	}
	public void setAccountPhone(String accountPhone) {
		this.accountPhone = accountPhone;
	}
	public String getAccountLocation() {
		return accountLocation;
	}
	public void setAccountLocation(String accountLocation) {
		this.accountLocation = accountLocation;
	}
	public String getArnNumber() {
		return arnNumber;
	}
	public void setArnNumber(String arnNumber) {
		this.arnNumber = arnNumber;
	}
	public String getAccountTypae() {
		return accountTypae;
	}
	public void setAccountTypae(String accountTypae) {
		this.accountTypae = accountTypae;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	
	
	
	

}

