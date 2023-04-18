package com.srmt.service.masters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.Holiday;
import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.model.hrms.administration.Location;
import com.srmt.repository.hrms.administration.HolidayRepository;
import com.srmt.repository.hrms.administration.LeavePeriodRepository;
import com.srmt.repository.hrms.administration.LocationRepository;
import com.srmt.repository.specifications.HolidaySpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class HolidayMasterServiceImpl extends GenericServiceImpl<Holiday, Long>
		implements HolidayMasterService {

	@Autowired
	private HolidayRepository holidayMasterRepository;

	@Autowired
	private LeavePeriodRepository leavePeriodRepository;

	@Autowired
	private LocationRepository locationRepository;

	public HolidayMasterServiceImpl() {
		super(Holiday.class);
	}

	@Override
	public void deleteById(Long id) {
		Holiday holidayMasterById = holidayMasterRepository.findOne(id);

		if (holidayMasterById == null) {
			throw new RuntimeException("Holiday [" + id + "] does not exists.");
		}
		holidayMasterRepository.delete(holidayMasterById);
	}

	@Override
	public List<Holiday> findByPageAndSize(int page, int size) {
		return holidayMasterRepository.findAll(new PageRequest(page, size))
				.getContent();
	}

	@Override
	public Long getCount() {
		return holidayMasterRepository.count();
	}

	/*
	 * @Override public void add(long id, Holiday holiday) { if
	 * ((holiday.getHolidayDate().isBefore(
	 * holiday.getLeavePeriod().getStartDate()) || (holiday .getHolidayDate()
	 * .isAfter(holiday.getLeavePeriod().getEndDate())))) { throw new
	 * RuntimeException(" Date must be in between Leave Period"); }
	 * 
	 * super.add(LeavePeriod.class, id, holiday, new
	 * HolidayRepository.SPECIFICATIONS() .findByLeavePeriodAndName(id,
	 * holiday.getHolidayName())); }
	 * 
	 * @Override public void update(Long id, Holiday holiday) {
	 * super.add(LeavePeriod.class, id, holiday, new
	 * HolidayRepository.SPECIFICATIONS() .findByLeavePeriodAndName(id,
	 * holiday.getHolidayName())); }
	 */

	@Override
	public int findByLeavePeriodAndStateCount(Long periodid, Long stateId) {
		Specification<Holiday> specification = HolidaySpecification
				.searchByLeavePeriodAndState(periodid, stateId);
		return holidayMasterRepository.findAll(specification).size();
	}

	@Override
	public List<Holiday> findByLeavePeriodAndState(Long periodid, Long stateId,
			int page, int size) {
		Specification<Holiday> specification = HolidaySpecification
				.searchByLeavePeriodAndState(periodid, stateId);
		return holidayMasterRepository.findAll(specification,
				new PageRequest(page, size)).getContent();
	}

	@Override
	public void addHolidays(Long id, Long calenderYearId, List<Holiday> holidays) {
		Location location = locationRepository.findOne(id);
		LeavePeriod calenderYear = leavePeriodRepository
				.findOne(calenderYearId);
		List<Holiday> holidaysList = new ArrayList<Holiday>();
		for (Holiday holiday : holidays) {
			
			holiday.setLocation(location);
			holiday.setLeavePeriod(calenderYear);
			if (holiday.getHolidayDate().isBefore(calenderYear.getStartDate())
					|| holiday.getHolidayDate().isAfter(
							calenderYear.getEndDate())) {
				throw new RuntimeException(
						"Holiday Date Must be in Between Calender Year");
			}
			
		/*List<Holiday> holidayFromDb=	holidayMasterRepository.findByHolidayDateAndLocation(holiday.getHolidayDate(), location);
		if(holidayFromDb.size()!=0){
			throw new RuntimeException(
					"Holiday Already Added for this Date In This Calender Year");
		}*/
			
			List<Holiday> holidayFromDb=	holidayMasterRepository.findByHolidayDateAndLocationAndHolidayName(holiday.getHolidayDate(), location, holiday.getHolidayName());
			if(holidayFromDb.size()!=0){
				throw new RuntimeException(
						"Holiday Already Added for this Date In This Calender Year");
			}
			
			holidaysList.add(holiday);

		}
		holidayMasterRepository.save(holidaysList);

	}

	@Override
	public void updataHoliday(Long id, Long calenderYearId, Long holidayId,
			Holiday holiday) {
		Location location = locationRepository.findOne(id);
		List<Holiday> holidayFromDb=	holidayMasterRepository.findByHolidayDateAndLocationAndHolidayName(holiday.getHolidayDate(), location, holiday.getHolidayName());
		if(holidayFromDb.size()!=0){
			for (Holiday holiday2 : holidayFromDb) {
				if(holiday2.getId()!=holidayId){
				System.out.println("given holiday name is: "+holiday.getHolidayName()+" size is : "+holidayFromDb.size());
				throw new RuntimeException(
						"Holiday Already Added for this Date In This Calender Year");
			}
			}
			
		}
		LeavePeriod calenderYear = leavePeriodRepository
				.findOne(calenderYearId);
		Holiday holiday1 = holidayMasterRepository.findOne(holidayId);
		holiday1.setComments(holiday.getComments());
		holiday1.setHolidayDate(holiday.getHolidayDate());
		holiday1.setLocation(location);
		holiday1.setLeavePeriod(calenderYear);
		holiday1.setHolidayName(holiday.getHolidayName());
		if (holiday.getHolidayDate().isBefore(calenderYear.getStartDate())
				|| holiday.getHolidayDate().isAfter(
						calenderYear.getEndDate())) {
			throw new RuntimeException(
					"Holiday Date Must be in Between Calender Year");
		}
		
		/*if(holidayMasterRepository.findByHolidayDateAndLocation(holiday.getHolidayDate(), location)!=null)
			throw new RuntimeException("Holiday already added for the Location on this Date");*/
		holidayMasterRepository.save(holiday1);

	}

}