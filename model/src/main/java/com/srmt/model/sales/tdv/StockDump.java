package com.srmt.model.sales.tdv;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GeneratorType;

@Entity
@Table(name="sales_stock_dump")
public class StockDump {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private LocalDate tmInvoiceDate;
	private String tmInvoiceNo;
	private String chassisNo;
	private String engineNo;
	private String dealerPurchaseOrderPrice;
	private String productDescription;
	private LocalDate manufacturingDate;
	private String dlrInvoiceNo;
	private String productLine;
	private String physicalStatus;
	private String LOB;
	private String parentProducLine;
	private String productVC;
	private String businessUnit;
	private String vehicleLocation;
	private String firstSaleDate;
	private String LoyMemberId;
	private String chassis;
	private String URN;
	private String bodySerialNumber;
	private String amcNumber;
	private String amcStatus;
	private String amcStartDate;
	private String amcEndDate;
	private String amcStartKms;
	private String amcEndKms;
	private String amcType;
	private String keyNo;
	private String vcColor;
	private String model;
	private String emissionNorm;
	private String salesOrderNo;
	private String shipmentTruckNo;
	private LocalDate classificationDate;
	private LocalDate actualDeliveryDate;
	private String transporterName;
	private String chassisAgeinDays;
	private String sapSalesOrderNo;
	private String dealerPurcahseOrderNo;
	private String financierName;
	private String chassisColor;
	private String fbvIndicator;
	private LocalDate warrantyExpiryDate;
	private String warrantyExpiryKm;
	private String warrantyExpiryHours;
	private String totalLossVehicle;
	private String sellingDealer;
	private String dealerResponsibleFor;
	private String policyNumber;
	private LocalDate policyStartDate;
	private LocalDate PolicyEndDate;
	private String nameOfInsuranceCompany;
	private String odPremium;
	private String tpPremium;
	private String bookingRefNo;
	private String extdWarrantyPolicyNumber;
	private String insuranceType;
	private String contactAuthorization;
	private String SSI;
	private LocalDate dbDeliveredDate;
	private LocalDate dbInspectionDate;
	private String inspectionRequired;
	private LocalDate dbReceivedOkDate;
	private String vahanUploadStatus;
	private String vahanUploadError;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getTmInvoiceDate() {
		return tmInvoiceDate;
	}
	public void setTmInvoiceDate(LocalDate tmInvoiceDate) {
		this.tmInvoiceDate = tmInvoiceDate;
	}
	public String getTmInvoiceNo() {
		return tmInvoiceNo;
	}
	public void setTmInvoiceNo(String tmInvoiceNo) {
		this.tmInvoiceNo = tmInvoiceNo;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getEngineNo() {
		return engineNo;
	}
	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}
	public String getDealerPurchaseOrderPrice() {
		return dealerPurchaseOrderPrice;
	}
	public void setDealerPurchaseOrderPrice(String dealerPurchaseOrderPrice) {
		this.dealerPurchaseOrderPrice = dealerPurchaseOrderPrice;
	}
	public String getProductDescription() {
		return productDescription;
	}
	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}
	public LocalDate getManufacturingDate() {
		return manufacturingDate;
	}
	public void setManufacturingDate(LocalDate manufacturingDate) {
		this.manufacturingDate = manufacturingDate;
	}
	public String getDlrInvoiceNo() {
		return dlrInvoiceNo;
	}
	public void setDlrInvoiceNo(String dlrInvoiceNo) {
		this.dlrInvoiceNo = dlrInvoiceNo;
	}
	public String getProductLine() {
		return productLine;
	}
	public void setProductLine(String productLine) {
		this.productLine = productLine;
	}
	public String getPhysicalStatus() {
		return physicalStatus;
	}
	public void setPhysicalStatus(String physicalStatus) {
		this.physicalStatus = physicalStatus;
	}
	public String getLOB() {
		return LOB;
	}
	public void setLOB(String lOB) {
		LOB = lOB;
	}
	public String getParentProducLine() {
		return parentProducLine;
	}
	public void setParentProducLine(String parentProducLine) {
		this.parentProducLine = parentProducLine;
	}
	public String getProductVC() {
		return productVC;
	}
	public void setProductVC(String productVC) {
		this.productVC = productVC;
	}
	public String getBusinessUnit() {
		return businessUnit;
	}
	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}
	public String getVehicleLocation() {
		return vehicleLocation;
	}
	public void setVehicleLocation(String vehicleLocation) {
		this.vehicleLocation = vehicleLocation;
	}
	public String getFirstSaleDate() {
		return firstSaleDate;
	}
	public void setFirstSaleDate(String firstSaleDate) {
		this.firstSaleDate = firstSaleDate;
	}
	public String getLoyMemberId() {
		return LoyMemberId;
	}
	public void setLoyMemberId(String loyMemberId) {
		LoyMemberId = loyMemberId;
	}
	public String getChassis() {
		return chassis;
	}
	public void setChassis(String chassis) {
		this.chassis = chassis;
	}
	public String getURN() {
		return URN;
	}
	public void setURN(String uRN) {
		URN = uRN;
	}
	public String getBodySerialNumber() {
		return bodySerialNumber;
	}
	public void setBodySerialNumber(String bodySerialNumber) {
		this.bodySerialNumber = bodySerialNumber;
	}
	public String getAmcNumber() {
		return amcNumber;
	}
	public void setAmcNumber(String amcNumber) {
		this.amcNumber = amcNumber;
	}
	public String getAmcStatus() {
		return amcStatus;
	}
	public void setAmcStatus(String amcStatus) {
		this.amcStatus = amcStatus;
	}
	public String getAmcStartDate() {
		return amcStartDate;
	}
	public void setAmcStartDate(String amcStartDate) {
		this.amcStartDate = amcStartDate;
	}
	public String getAmcEndDate() {
		return amcEndDate;
	}
	public void setAmcEndDate(String amcEndDate) {
		this.amcEndDate = amcEndDate;
	}
	public String getAmcStartKms() {
		return amcStartKms;
	}
	public void setAmcStartKms(String amcStartKms) {
		this.amcStartKms = amcStartKms;
	}
	public String getAmcEndKms() {
		return amcEndKms;
	}
	public void setAmcEndKms(String amcEndKms) {
		this.amcEndKms = amcEndKms;
	}
	public String getAmcType() {
		return amcType;
	}
	public void setAmcType(String amcType) {
		this.amcType = amcType;
	}
	public String getKeyNo() {
		return keyNo;
	}
	public void setKeyNo(String keyNo) {
		this.keyNo = keyNo;
	}
	public String getVcColor() {
		return vcColor;
	}
	public void setVcColor(String vcColor) {
		this.vcColor = vcColor;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getEmissionNorm() {
		return emissionNorm;
	}
	public void setEmissionNorm(String emissionNorm) {
		this.emissionNorm = emissionNorm;
	}
	public String getSalesOrderNo() {
		return salesOrderNo;
	}
	public void setSalesOrderNo(String salesOrderNo) {
		this.salesOrderNo = salesOrderNo;
	}
	public String getShipmentTruckNo() {
		return shipmentTruckNo;
	}
	public void setShipmentTruckNo(String shipmentTruckNo) {
		this.shipmentTruckNo = shipmentTruckNo;
	}
	public LocalDate getClassificationDate() {
		return classificationDate;
	}
	public void setClassificationDate(LocalDate classificationDate) {
		this.classificationDate = classificationDate;
	}
	public LocalDate getActualDeliveryDate() {
		return actualDeliveryDate;
	}
	public void setActualDeliveryDate(LocalDate actualDeliveryDate) {
		this.actualDeliveryDate = actualDeliveryDate;
	}
	public String getTransporterName() {
		return transporterName;
	}
	public void setTransporterName(String transporterName) {
		this.transporterName = transporterName;
	}
	public String getChassisAgeinDays() {
		return chassisAgeinDays;
	}
	public void setChassisAgeinDays(String chassisAgeinDays) {
		this.chassisAgeinDays = chassisAgeinDays;
	}
	public String getSapSalesOrderNo() {
		return sapSalesOrderNo;
	}
	public void setSapSalesOrderNo(String sapSalesOrderNo) {
		this.sapSalesOrderNo = sapSalesOrderNo;
	}
	public String getDealerPurcahseOrderNo() {
		return dealerPurcahseOrderNo;
	}
	public void setDealerPurcahseOrderNo(String dealerPurcahseOrderNo) {
		this.dealerPurcahseOrderNo = dealerPurcahseOrderNo;
	}
	public String getFinancierName() {
		return financierName;
	}
	public void setFinancierName(String financierName) {
		this.financierName = financierName;
	}
	public String getChassisColor() {
		return chassisColor;
	}
	public void setChassisColor(String chassisColor) {
		this.chassisColor = chassisColor;
	}
	public String getFbvIndicator() {
		return fbvIndicator;
	}
	public void setFbvIndicator(String fbvIndicator) {
		this.fbvIndicator = fbvIndicator;
	}
	public LocalDate getWarrantyExpiryDate() {
		return warrantyExpiryDate;
	}
	public void setWarrantyExpiryDate(LocalDate warrantyExpiryDate) {
		this.warrantyExpiryDate = warrantyExpiryDate;
	}
	public String getWarrantyExpiryKm() {
		return warrantyExpiryKm;
	}
	public void setWarrantyExpiryKm(String warrantyExpiryKm) {
		this.warrantyExpiryKm = warrantyExpiryKm;
	}
	public String getWarrantyExpiryHours() {
		return warrantyExpiryHours;
	}
	public void setWarrantyExpiryHours(String warrantyExpiryHours) {
		this.warrantyExpiryHours = warrantyExpiryHours;
	}
	public String getTotalLossVehicle() {
		return totalLossVehicle;
	}
	public void setTotalLossVehicle(String totalLossVehicle) {
		this.totalLossVehicle = totalLossVehicle;
	}
	public String getSellingDealer() {
		return sellingDealer;
	}
	public void setSellingDealer(String sellingDealer) {
		this.sellingDealer = sellingDealer;
	}
	public String getDealerResponsibleFor() {
		return dealerResponsibleFor;
	}
	public void setDealerResponsibleFor(String dealerResponsibleFor) {
		this.dealerResponsibleFor = dealerResponsibleFor;
	}
	public String getPolicyNumber() {
		return policyNumber;
	}
	public void setPolicyNumber(String policyNumber) {
		this.policyNumber = policyNumber;
	}
	public LocalDate getPolicyStartDate() {
		return policyStartDate;
	}
	public void setPolicyStartDate(LocalDate policyStartDate) {
		this.policyStartDate = policyStartDate;
	}
	public LocalDate getPolicyEndDate() {
		return PolicyEndDate;
	}
	public void setPolicyEndDate(LocalDate policyEndDate) {
		PolicyEndDate = policyEndDate;
	}
	public String getNameOfInsuranceCompany() {
		return nameOfInsuranceCompany;
	}
	public void setNameOfInsuranceCompany(String nameOfInsuranceCompany) {
		this.nameOfInsuranceCompany = nameOfInsuranceCompany;
	}
	public String getOdPremium() {
		return odPremium;
	}
	public void setOdPremium(String odPremium) {
		this.odPremium = odPremium;
	}
	public String getTpPremium() {
		return tpPremium;
	}
	public void setTpPremium(String tpPremium) {
		this.tpPremium = tpPremium;
	}
	public String getBookingRefNo() {
		return bookingRefNo;
	}
	public void setBookingRefNo(String bookingRefNo) {
		this.bookingRefNo = bookingRefNo;
	}
	public String getExtdWarrantyPolicyNumber() {
		return extdWarrantyPolicyNumber;
	}
	public void setExtdWarrantyPolicyNumber(String extdWarrantyPolicyNumber) {
		this.extdWarrantyPolicyNumber = extdWarrantyPolicyNumber;
	}
	public String getInsuranceType() {
		return insuranceType;
	}
	public void setInsuranceType(String insuranceType) {
		this.insuranceType = insuranceType;
	}
	public String getContactAuthorization() {
		return contactAuthorization;
	}
	public void setContactAuthorization(String contactAuthorization) {
		this.contactAuthorization = contactAuthorization;
	}
	public String getSSI() {
		return SSI;
	}
	public void setSSI(String sSI) {
		SSI = sSI;
	}
	public LocalDate getDbDeliveredDate() {
		return dbDeliveredDate;
	}
	public void setDbDeliveredDate(LocalDate dbDeliveredDate) {
		this.dbDeliveredDate = dbDeliveredDate;
	}
	public LocalDate getDbInspectionDate() {
		return dbInspectionDate;
	}
	public void setDbInspectionDate(LocalDate dbInspectionDate) {
		this.dbInspectionDate = dbInspectionDate;
	}
	public String getInspectionRequired() {
		return inspectionRequired;
	}
	public void setInspectionRequired(String inspectionRequired) {
		this.inspectionRequired = inspectionRequired;
	}
	public LocalDate getDbReceivedOkDate() {
		return dbReceivedOkDate;
	}
	public void setDbReceivedOkDate(LocalDate dbReceivedOkDate) {
		this.dbReceivedOkDate = dbReceivedOkDate;
	}
	public String getVahanUploadStatus() {
		return vahanUploadStatus;
	}
	public void setVahanUploadStatus(String vahanUploadStatus) {
		this.vahanUploadStatus = vahanUploadStatus;
	}
	public String getVahanUploadError() {
		return vahanUploadError;
	}
	public void setVahanUploadError(String vahanUploadError) {
		this.vahanUploadError = vahanUploadError;
	}
	
}
