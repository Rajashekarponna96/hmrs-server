package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.Act;
import com.srmt.model.hrms.administration.ActShedule;
import com.srmt.service.GenericService;

public interface ActService extends GenericService<Act, Long> {

	void add(Act act);

	void update(Long id, Act act);

	List<Act> getAll();

	void deleteAct(Long id);

	List<ActShedule> getActSchedulesById(Long id);
}
