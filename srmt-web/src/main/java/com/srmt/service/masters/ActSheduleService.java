package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.ActShedule;
import com.srmt.service.GenericService;

public interface ActSheduleService extends GenericService<ActShedule, Long>{

	void addActShedule(Long actId, ActShedule actShedule);

	void deleteActShedule(Long id);

	List<ActShedule> getAllActShedules();

	void updateActShedule(Long actId, ActShedule actShedule);

	List<ActShedule> searchActShedulesByActId(Long actId);

}
