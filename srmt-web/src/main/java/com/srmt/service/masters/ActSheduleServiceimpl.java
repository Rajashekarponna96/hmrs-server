package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.Act;
import com.srmt.model.hrms.administration.ActShedule;
import com.srmt.repository.hrms.administration.ActRepository;
import com.srmt.repository.hrms.administration.ActSheduleRepository;
import com.srmt.repository.specifications.ActSheduleSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class ActSheduleServiceimpl extends GenericServiceImpl<ActShedule, Long>
		implements ActSheduleService {

	@Autowired
	private ActSheduleRepository actSheduleRepository;

	@Autowired
	private ActRepository actRepository;

	public ActSheduleServiceimpl() {
		super(ActShedule.class);

	}

	@Override
	public void addActShedule(Long actId, ActShedule actShedule) {

		super.add(
				Act.class,
				actId,
				actShedule,
				genericSpecification.findByProperty("code",
						actShedule.getCode()));
	}

	@Override
	public void deleteActShedule(Long id) {
		super.delete(id);

	}

	@Override
	public List<ActShedule> getAllActShedules() {

		return (List<ActShedule>) actSheduleRepository.findAll();
	}

	@Override
	public void updateActShedule(Long actId, ActShedule actShedule) {
		super.add(
				Act.class,
				actId,
				actShedule,
				genericSpecification.findByProperty("code",
						actShedule.getCode()));

	}

	@Override
	public List<ActShedule> searchActShedulesByActId(Long actId) {
		
		Specification<ActShedule> actShedules=ActSheduleSpecification.searchActShedulesByActId(actId);
		return  actSheduleRepository.findAll(actShedules);
	}

}
