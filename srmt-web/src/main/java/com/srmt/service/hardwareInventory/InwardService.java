package com.srmt.service.hardwareInventory;

import java.util.List;

import com.srmt.model.hardwareInventory.Inward;
import com.srmt.service.GenericService;

public interface InwardService extends GenericService<Inward, Long>{

	void add(Inward inward);

	List<Inward> findAllSorting(int page, int size);


	List<Inward> findInwards();

	void updateInward(Long id, Inward inward);
	
	

}
