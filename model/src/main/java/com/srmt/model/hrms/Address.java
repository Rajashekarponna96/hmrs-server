package com.srmt.model.hrms;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.geo.Distance;

import com.srmt.model.common.lookups.Country;
import com.srmt.model.common.lookups.District;
import com.srmt.model.common.lookups.State;

@Embeddable
public class Address implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -646900846150702917L;
	private String street1;
	private String street2;
	private String city;

	@ManyToOne
	private District district;

	@ManyToOne
	private State state;

	@ManyToOne
	private Country country;

	private String pinCode;

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public District getDistrict() {
		return district;
	}

	public void setDistrict(District district) {
		this.district = district;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public String getPinCode() {
		return pinCode;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	public String getStreet1() {
		return street1;
	}

	public void setStreet1(String street1) {
		this.street1 = street1;
	}

	public String getStreet2() {
		return street2;
	}

	public void setStreet2(String street2) {
		this.street2 = street2;
	}

	@Override
	public String toString() {

		StringBuffer address = new StringBuffer();
		if (street1 != null) {
			address.append(street1).append(",");
		}
		if (street2 != null) {
			address.append(street2).append(",");
		}
		if (city != null) {
			address.append(city).append(",");
		}
		if (district != null) {
			address.append(district.getName()).append(",");
		}
		if (state != null) {
			address.append(state.getName()).append(",");
		}
		if (country != null) {
			address.append(country.getName()).append(",");
		}
		if (pinCode != null) {
			address.append(pinCode).append(",");
		}

		return address.deleteCharAt(address.length() - 1).toString();
	}
}
