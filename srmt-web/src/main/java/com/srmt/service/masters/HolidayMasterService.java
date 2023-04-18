package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.Holiday;
import com.srmt.service.GenericService;

public interface HolidayMasterService extends GenericService<Holiday, Long> {

	void deleteById(Long id);

	List<Holiday> findByPageAndSize(int page, int size);

	Long getCount();

	


	int findByLeavePeriodAndStateCount(Long periodid, Long stateId);

	List<Holiday> findByLeavePeriodAndState(Long periodid, Long stateId, int page, int size);

	void addHolidays(Long id, Long calenderYearId, List<Holiday> holidays);

	void updataHoliday(Long id, Long calenderYearId, Long holidayId,
			Holiday holiday);

}
