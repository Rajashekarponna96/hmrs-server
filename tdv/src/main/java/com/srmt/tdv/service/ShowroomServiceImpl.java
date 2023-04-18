package com.srmt.tdv.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.sales.ShowRoom;
import com.srmt.repository.specifications.tdv.ShowroomSpecifications;
import com.srmt.repository.tdv.repository.ShowroomRepository;

@Service
public class ShowroomServiceImpl implements ShowroomService {

	@Autowired
	private ShowroomRepository showroomRepository;

	@Override
	public List<ShowRoom> searchByShowroomIdAndLocation(String showroomCode,
			Long locationId, int page, int size) {

		Specification<ShowRoom> specification = ShowroomSpecifications
				.searchByShowroomCodeOrLocationId(showroomCode, locationId);
		return showroomRepository.findAll(specification,
				new PageRequest(page, size)).getContent();
	}

	@Override
	public int searchByShowroomIdAndLocationCount(String showroomId,
			Long locationId) {
		Specification<ShowRoom> specification = ShowroomSpecifications
				.searchByShowroomCodeOrLocationId(showroomId, locationId);
		return showroomRepository.findAll(specification).size();
	}

}
