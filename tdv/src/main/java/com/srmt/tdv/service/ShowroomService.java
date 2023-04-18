package com.srmt.tdv.service;

import java.util.List;

import com.srmt.model.sales.ShowRoom;

public interface ShowroomService{
	List<ShowRoom> searchByShowroomIdAndLocation(String showroomCode,
			Long locationId, int page, int size);

	int searchByShowroomIdAndLocationCount(String showroomCode, Long locationId);

}
