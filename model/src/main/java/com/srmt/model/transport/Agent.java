package com.srmt.model.transport;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.rest.model.IEntity;

@Audited
@Entity
@Table(name="transport_agent_master")
@EntityListeners(AuditingEntityListener.class)
public class Agent implements Serializable,IEntity<Agent> {
	 static final long serialVersionUID=1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String agentCode;
	private String agentName;
	private String agentAddress;
	private String agentMobile;
	private String agentLand;
	private String agentPan;
	private LocalDateTime appointmentDate;
	private LocalDateTime agreementDate;
	private String surityName;
	private String surityAddress;
	private String surityPropertyDetails;
	private String description;
	
	private boolean active;
	
	@ManyToOne
	private Station station;
	
	public Station getStation() {
		return station;
	}

	public void setStation(Station station) {
		this.station = station;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@CreatedDate
	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createDateTime;

	@LastModifiedDate
	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime modifiedDate;

	@CreatedBy
	private String createdBy;

	@LastModifiedBy
	private String modifiedBy;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAgentCode() {
		return agentCode;
	}

	public void setAgentCode(String agentCode) {
		this.agentCode = agentCode;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getAgentAddress() {
		return agentAddress;
	}

	public void setAgentAddress(String agentAddress) {
		this.agentAddress = agentAddress;
	}

	public String getAgentMobile() {
		return agentMobile;
	}

	public void setAgentMobile(String agentMobile) {
		this.agentMobile = agentMobile;
	}

	public String getAgentLand() {
		return agentLand;
	}

	public void setAgentLand(String agentLand) {
		this.agentLand = agentLand;
	}

	public String getAgentPan() {
		return agentPan;
	}

	public void setAgentPan(String agentPan) {
		this.agentPan = agentPan;
	}
	
	@JsonIgnore
	public LocalDateTime getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(LocalDateTime appointmentDate) {
		this.appointmentDate = appointmentDate;
	}
	
	
	@JsonIgnore
	public LocalDateTime getAgreementDate() {
		return agreementDate;
	}

	public void setAgreementDate(LocalDateTime agreementDate) {
		this.agreementDate = agreementDate;
	}

	public String getSurityName() {
		return surityName;
	}

	public void setSurityName(String surityName) {
		this.surityName = surityName;
	}

	public String getSurityAddress() {
		return surityAddress;
	}

	public void setSurityAddress(String surityAddress) {
		this.surityAddress = surityAddress;
	}

	public String getSurityPropertyDetails() {
		return surityPropertyDetails;
	}

	public void setSurityPropertyDetails(String surityPropertyDetails) {
		this.surityPropertyDetails = surityPropertyDetails;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	@JsonIgnore
	public LocalDateTime getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(LocalDateTime createDateTime) {
		this.createDateTime = createDateTime;
	}
	
	@JsonIgnore
	public LocalDateTime getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(LocalDateTime modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	
	@JsonIgnore
	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	
	@JsonIgnore
	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Agent other = (Agent) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public void copy(Agent toEntity)  {
		
		toEntity.setId(id);
		toEntity.setAgentCode(agentCode);
		toEntity.setAgentName(agentName);
		toEntity.setAgentAddress(agentAddress);
		toEntity.setAgentMobile(agentMobile);
		toEntity.setAgentLand(agentLand);
		toEntity.setAgentPan(agentPan);
		toEntity.setAppointmentDate(appointmentDate);
		toEntity.setAgreementDate(agreementDate);
		toEntity.setSurityName(surityName);
		toEntity.setSurityAddress(surityAddress);
		toEntity.setSurityPropertyDetails(surityPropertyDetails);
		toEntity.setDescription(description);
		toEntity.setActive(active);
		toEntity.setStation(station);
		
	}

	
	
	

}
