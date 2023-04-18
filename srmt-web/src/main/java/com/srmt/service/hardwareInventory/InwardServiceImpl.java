package com.srmt.service.hardwareInventory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import com.srmt.model.hardwareInventory.Inward;
import com.srmt.repository.hardwareInventory.InwardRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class InwardServiceImpl extends GenericServiceImpl<Inward, Long>implements InwardService {

	public InwardServiceImpl() {
		super(Inward.class);
	}
	@Autowired
	private InwardRepository inwardRepository;
	@Override
	public void add(Inward inward) {
		List<Inward> controls = inwardRepository.findByItemOrCode(
				inward.getItem(), inward.getCode());

		if (controls.size() != 0) {
			throw new RuntimeException("Duplicate Entry for Product");
		}
		inwardRepository.save(inward);
		
	}
	@Override
	public List<Inward> findAllSorting(int page, int size) {
		PageRequest pageRequest = new PageRequest(page, size, Direction.ASC,
				"item");
		return inwardRepository.findAll(pageRequest).getContent();
	}
	
	@Override
	public List<Inward> findInwards() {
		return (List<Inward>) inwardRepository.findAll(new Sort(new Order(
				Direction.ASC, "item")));
	}
	@Override
	public void updateInward(Long id, Inward inward) {
		List<Inward> inwards = inwardRepository.findByItemOrCode(
				inward.getItem(), inward.getCode());
		if (inwards.size() != 0) {
			for (Inward inward2 : inwards) {
				if (inward2.getId() != id) {
					throw new RuntimeException("Duplicate Entry for Product");
				}
			}
		}

		inwardRepository.save(inward);
	
	}

}
