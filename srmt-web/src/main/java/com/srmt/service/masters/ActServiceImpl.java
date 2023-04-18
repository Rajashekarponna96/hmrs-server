package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.Act;
import com.srmt.model.hrms.administration.ActShedule;
import com.srmt.repository.hrms.administration.ActRepository;
import com.srmt.repository.hrms.administration.ActSheduleRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class ActServiceImpl extends GenericServiceImpl<Act, Long> implements
		ActService {

	@Autowired
	private ActRepository actRepository;

	@Autowired
	private ActSheduleRepository actSheduleRepository;

	public ActServiceImpl() {
		super(Act.class);

	}

	@Override
	public void add(Act act) {
		super.add(Act.class, act.getCode(),
				genericSpecification.findByProperty("code", act.getCode()), act);

	}

	@Override
	public void update(Long id, Act act) {
		Act dbAct = super.findBy(Act.class, id);

		Act actBycode = actRepository.findByCode(act.getCode());
		if (actBycode != null && !actBycode.getId().equals(id)) {
			throw new RuntimeException("Act code #[" + act.getCode()
					+ "] already exists.");
		}
		dbAct.setCode(act.getCode());
		dbAct.setDescription(act.getDescription());
		dbAct.setName(act.getName());
		baseRepository.save(dbAct);

	}

	@Override
	public List<Act> getAll() {

		return (List<Act>) actRepository.findAll();
	}

	@Override
	public void deleteAct(Long id) {
		super.delete(id);

	}

	@Override
	public List<ActShedule> getActSchedulesById(Long id) {
		Act act = actRepository.findOne(id);
		return act.getActShedules();
	}
}
