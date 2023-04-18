package com.srmt.model.sales.tdv;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.srmt.rest.model.IEntity;

@Audited
@Entity
@Table(name = "sales_productLineColor")
@EntityListeners(AuditingEntityListener.class)
public  class ProductLineColor implements IEntity<ProductLineColor> {
	private Long id;

	private String name;

	private String code;

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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Override
	public void copy(ProductLineColor toEntity) throws Exception {
		toEntity.setCode(code);
		toEntity.setId(id);
		toEntity.setName(name);
	}
}
