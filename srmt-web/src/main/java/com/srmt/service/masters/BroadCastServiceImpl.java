package com.srmt.service.masters;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.BroadCastMessage;
import com.srmt.repository.hrms.administration.BroadCastMessageRepository;
import com.srmt.repository.specifications.BroadCastMessageSpecification;

@Service
public class BroadCastServiceImpl implements BroadCastMesageService {

	@Autowired
	private BroadCastMessageRepository broadCastMessageMasterRepository;

	@Override
	public void add(BroadCastMessage broadCastMessageMaster) {
		BroadCastMessage broadCastMessageMasterByName = broadCastMessageMasterRepository
				.findByName(broadCastMessageMaster.getName());
		if (broadCastMessageMasterByName != null) {
			throw new RuntimeException("BroadCastMessageMaster ["
					+ broadCastMessageMaster.getName()
					+ "] name is already exists");
		}
		if (broadCastMessageMaster.getValidFrom().isAfter(
				broadCastMessageMaster.getToValid())) {
			throw new RuntimeException("Select valid date range");
		}

		broadCastMessageMasterRepository.save(broadCastMessageMaster);
	}

	@Override
	public void update(Long id, BroadCastMessage broadCastMessageMaster) {

		BroadCastMessage broadCastMessageMasterById = broadCastMessageMasterRepository
				.findOne(id);
		if (broadCastMessageMasterById == null) {
			throw new RuntimeException("BroadCastMessageMaster [" + id
					+ "] id doesnot exists.");
		}

		BroadCastMessage broadCastMessageMasterByName = broadCastMessageMasterRepository
				.findByName(broadCastMessageMaster.getName());
		if (broadCastMessageMasterByName != null) {
			if (broadCastMessageMasterByName.getId() != broadCastMessageMasterById
					.getId()) {
				throw new RuntimeException("BroadCastMessageMaster ["
						+ broadCastMessageMaster.getName()
						+ "] name is already exists");
			}
		}
		if (broadCastMessageMaster.getValidFrom().isAfter(
				broadCastMessageMaster.getToValid())) {
			throw new RuntimeException("Select valid date range");
		}
		broadCastMessageMasterById.setMessage(broadCastMessageMaster
				.getMessage());
		broadCastMessageMasterById.setMessageType(broadCastMessageMaster
				.getMessageType());
		broadCastMessageMasterById.setName(broadCastMessageMaster.getName());
		broadCastMessageMasterById.setToValid(broadCastMessageMaster
				.getToValid());
		broadCastMessageMasterById.setValidFrom(broadCastMessageMaster
				.getValidFrom());
		broadCastMessageMasterRepository.save(broadCastMessageMasterById);

	}

	@Override
	public List<BroadCastMessage> findByPageAndSize(int page, int size) {
		return broadCastMessageMasterRepository.findAll(
				new PageRequest(page, size)).getContent();
	}

	@Override
	public void deleteById(Long id) {
		BroadCastMessage broadCastMessageMasterById = broadCastMessageMasterRepository
				.findOne(id);
		if (broadCastMessageMasterById == null) {
			throw new RuntimeException("BroadCastMessageMaster [" + id
					+ "] id doesnot exists.");
		}
		broadCastMessageMasterRepository.delete(broadCastMessageMasterById);
	}

	@Override
	public Long getCount() {
		return broadCastMessageMasterRepository.count();
	}

	@Override
	public List<BroadCastMessage> searchBroadCasteMessage(String searchKey,
			int page, int size) {
		Specification<BroadCastMessage> specification = BroadCastMessageSpecification
				.searchByType(searchKey);
		return broadCastMessageMasterRepository.findAll(specification,
				new PageRequest(page, size)).getContent();
	}

	@Override
	public int searchBroadCasteMessageCount(String searchKey) {
		Specification<BroadCastMessage> specification = BroadCastMessageSpecification
				.searchByType(searchKey);
		return broadCastMessageMasterRepository.findAll(specification).size();
	}

	@Override
	public List<BroadCastMessage> findActiveBroadCastMessage() {

		List<BroadCastMessage> list = broadCastMessageMasterRepository
				.findByValidFromAfter(LocalDate.now());
		return list;
	}

}
