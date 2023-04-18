package com.srmt.model.sales;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arbiva.date.jackson.serializer.LocalDateDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateSerializer;
import com.arbiva.date.jpa.converters.LocalDateConverter;
import com.arbiva.lang.Money;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.hrms.Person;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.model.sales.tdv.ProductLine;
import com.srmt.rest.model.IEntity;

@Audited
@Entity
@Access(AccessType.PROPERTY)
@Table(name = "sales_customer")
@EntityListeners(AuditingEntityListener.class)
public class Customer extends Person implements IEntity<Customer>, Serializable {

	private Employee salesRepresentative;

	private CustomerType customerType;

	private String sourceOfContact;

	private String vehicleApplication;

	private String financier;

	private String microMarket;

	private int vehicleQuantity;

	private Money pricePerVehicle;

	private Money vehicleInsurance;

	private Money trAmount;

	private Money taxAmount;

	private String remarks;

	private String optId;

	private ProductLine productLine;

	private Money otherCharges;

	private LocalDate date;

	public Customer() {
		date = LocalDate.now();
	}

	@ManyToOne
	public Employee getSalesRepresentative() {
		return salesRepresentative;
	}

	public void setSalesRepresentative(Employee salesRepresentative) {
		this.salesRepresentative = salesRepresentative;
	}

	@Enumerated
	public CustomerType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public String getSourceOfContact() {
		return sourceOfContact;
	}

	public void setSourceOfContact(String sourceOfContact) {
		this.sourceOfContact = sourceOfContact;
	}

	public String getVehicleApplication() {
		return vehicleApplication;
	}

	public void setVehicleApplication(String vehicleApplication) {
		this.vehicleApplication = vehicleApplication;
	}

	public String getFinancier() {
		return financier;
	}

	public void setFinancier(String financier) {
		this.financier = financier;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "price_per_vehicle")),
			@AttributeOverride(name = "currency", column = @Column(name = "price_per_vehicle_cur")), })
	public Money getPricePerVehicle() {
		return pricePerVehicle;
	}

	public void setPricePerVehicle(Money pricePerVehicle) {
		this.pricePerVehicle = pricePerVehicle;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public int getVehicleQuantity() {
		return vehicleQuantity;
	}

	public void setVehicleQuantity(int vehicleQuantity) {
		this.vehicleQuantity = vehicleQuantity;
	}

	public String getMicroMarket() {
		return microMarket;
	}

	public void setMicroMarket(String microMarket) {
		this.microMarket = microMarket;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "veh_insurance")),
			@AttributeOverride(name = "currency", column = @Column(name = "veh_insurance_cur")), })
	public Money getVehicleInsurance() {
		return vehicleInsurance;
	}

	public void setVehicleInsurance(Money vehicleInsurance) {
		this.vehicleInsurance = vehicleInsurance;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "tr_currency")),
			@AttributeOverride(name = "currency", column = @Column(name = "tr_amount")), })
	public Money getTrAmount() {
		return trAmount;
	}

	public void setTrAmount(Money trAmount) {
		this.trAmount = trAmount;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "tax_currency")),
			@AttributeOverride(name = "currency", column = @Column(name = "tax_amount")), })
	public Money getTaxAmount() {
		return taxAmount;
	}

	public void setTaxAmount(Money taxAmount) {
		this.taxAmount = taxAmount;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "other_charges_currency")),
			@AttributeOverride(name = "currency", column = @Column(name = "other_charges_amount")), })
	public Money getOtherCharges() {
		return otherCharges;
	}

	public void setOtherCharges(Money otherCharges) {
		this.otherCharges = otherCharges;
	}

	public String getOptId() {
		return optId;
	}

	public void setOptId(String optId) {
		this.optId = optId;
	}

	@ManyToOne
	public ProductLine getProductLine() {
		return productLine;
	}

	public void setProductLine(ProductLine productLine) {
		this.productLine = productLine;
	}

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	@Override
	public void copy(Customer toEntity) throws Exception {
		toEntity.setId(id);
		toEntity.setSalesRepresentative(salesRepresentative);
		toEntity.setCustomerType(customerType);
		toEntity.setFinancier(financier);
		toEntity.setPricePerVehicle(pricePerVehicle);
		toEntity.setMicroMarket(microMarket);
		toEntity.setSourceOfContact(sourceOfContact);
		toEntity.setVehicleApplication(vehicleApplication);
		toEntity.setVehicleInsurance(vehicleInsurance);
		toEntity.setVehicleQuantity(vehicleQuantity);
		toEntity.setOtherCharges(otherCharges);
		toEntity.setOptId(optId);
		toEntity.setRemarks(remarks);
		toEntity.setTrAmount(trAmount);
		toEntity.setTaxAmount(taxAmount);
		toEntity.setProductLine(productLine);
	}

	@Transient
	public Double getTotalCost() {
		return (pricePerVehicle!=null?pricePerVehicle.getAmount():0)* (vehicleQuantity!=0?vehicleQuantity:1);
	}

	@Transient
	public Double getGrandTotal() {
		return (getTotalCost() != null ? getTotalCost() : 0)
				+ (getVehicleInsurance() != null ? getVehicleInsurance()
						.getAmount() : 0)
				+ (getTrAmount() != null ? getTrAmount().getAmount() : 0)
				+ (getTaxAmount() != null ? getTaxAmount().getAmount() : 0)
				+ (getOtherCharges() != null ? getOtherCharges().getAmount()
						: 0);
	}

}