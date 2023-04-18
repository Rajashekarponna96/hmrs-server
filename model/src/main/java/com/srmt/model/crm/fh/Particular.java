package com.srmt.model.crm.fh;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arbiva.date.jackson.serializer.LocalDateDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateSerializer;
import com.arbiva.date.jpa.converters.LocalDateConverter;
import com.arbiva.lang.Money;
import com.arbiva.lang.Percentage;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.rest.model.IEntity;

@Audited
@Access(AccessType.PROPERTY)
@Entity
@Table(name = "crm_particular")
@EntityListeners(AuditingEntityListener.class)
public class Particular implements IEntity<Particular>, Serializable {

	private Long id;

	private String name;

	private Money unitPrice;

	private Double quantity;

	private Percentage tax;

	private String description;

	private ParticularType type;

	private Percentage discount;

	private LocalDate providedOn;
	@JsonIgnore
	private Invoice invoice;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	@Embedded
	public Money getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Money unitPrice) {
		this.unitPrice = unitPrice;
	}

	@Embedded
	@AttributeOverride(name = "value", column = @Column(name = "serviecetax_percentage"))
	public Percentage getTax() {
		return tax;
	}

	public void setTax(Percentage tax) {
		this.tax = tax;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Embedded
	@AttributeOverride(name = "value", column = @Column(name = "discount_percentage"))
	public Percentage getDiscount() {
		return discount;
	}

	public void setDiscount(Percentage discount) {
		this.discount = discount;
	}

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	public LocalDate getProvidedOn() {
		return providedOn;
	}

	public void setProvidedOn(LocalDate providedOn) {
		this.providedOn = providedOn;
	}

	@JsonIgnore
	@ManyToOne
	public Invoice getInvoice() {
		return invoice;
	}

	@JsonProperty
	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}

	public ParticularType getType() {
		return type;
	}

	public void setType(ParticularType type) {
		this.type = type;
	}

	@Transient
	public double getTotal() {
		return unitPrice.getAmount() * quantity;
	}

	@Override
	public void copy(Particular toEntity) {
		toEntity.setId(id);
		toEntity.setProvidedOn(providedOn);
		toEntity.setDescription(description);
		toEntity.setDiscount(discount);
		toEntity.setName(name);
		toEntity.setQuantity(quantity);
		toEntity.setTax(tax);
		toEntity.setUnitPrice(unitPrice);
		toEntity.setInvoice(invoice);
		toEntity.setType(type);

	}

}
