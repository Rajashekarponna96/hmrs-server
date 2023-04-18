package com.srmt.tdv.controller;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.sales.Customer;
import com.srmt.model.sales.ShowRoom;
import com.srmt.model.sales.Workshop;
import com.srmt.model.sales.tdv.Model;
import com.srmt.model.sales.tdv.ParentProductLine;
import com.srmt.model.sales.tdv.ProductLine;
import com.srmt.model.sales.tdv.ProductLineColor;
import com.srmt.model.sales.tdv.Segment;
import com.srmt.model.sales.tdv.Specification;
import com.srmt.model.sales.tdv.SpecificationCategory;
import com.srmt.rest.controller.GenericController;

@RestController
@RequestMapping(value = "/tdv")
public class CommonController extends GenericController {
	@Autowired
	private EntityManager em;

	@PostConstruct
	public void init() {
		List<String> packages = getGenericService().getPackages();
		packages.add("com.srmt.model.sales");
		packages.add("com.srmt.model.sales.tdv");

		Map<String, SimpleJpaRepository<?, Serializable>> registry = getGenericService()
				.getRegistry();
		registry.put("ShowRoom",
				new SimpleJpaRepository<ShowRoom, Serializable>(ShowRoom.class,
						em));
		registry.put("Workshop",
				new SimpleJpaRepository<Workshop, Serializable>(Workshop.class,
						em));

		registry.put("Model", new SimpleJpaRepository<Model, Serializable>(
				Model.class, em));
		registry.put("ProductLine",
				new SimpleJpaRepository<ProductLine, Serializable>(
						ProductLine.class, em));

		registry.put("ProductLineColor",
				new SimpleJpaRepository<ProductLineColor, Serializable>(
						ProductLineColor.class, em));
		registry.put("ParentProductLine",
				new SimpleJpaRepository<ParentProductLine, Serializable>(
						ParentProductLine.class, em));
		registry.put("Segment", new SimpleJpaRepository<Segment, Serializable>(
				Segment.class, em));
		registry.put("Specification",
				new SimpleJpaRepository<Specification, Serializable>(
						Specification.class, em));
		registry.put("SpecificationCategory",
				new SimpleJpaRepository<SpecificationCategory, Serializable>(
						SpecificationCategory.class, em));
		registry.put("Customer",
				new SimpleJpaRepository<Customer, Serializable>(
						Customer.class, em));
	}

}
