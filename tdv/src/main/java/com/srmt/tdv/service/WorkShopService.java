package com.srmt.tdv.service;

import java.util.List;



import com.srmt.model.sales.Workshop;

public interface WorkShopService {

	List<Workshop> searchByWorkShopCodeAndLocationId(String code,
			Long locationId, int page, int size);

	int searchByWorkShopCodeAndLocationIdCount(String code, Long locationId);

	
	

}
