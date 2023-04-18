package com.srmt.repository.hrms.administration;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.Department;

@Repository
public interface LocationDepartmentRepository extends
		PagingAndSortingRepository<Department, Long>,
		JpaSpecificationExecutor<Department> {
	
	
	String GET_LOCATION_WISE_ACTS="select department from Department department where department.location IS NOT NULL AND department.actShedule IS NOT NULL";
	
	@Query(GET_LOCATION_WISE_ACTS)
	public List<Department> findLocationWiseActs(Pageable pageable);
	
	
String GET_LOCATION_WISE_ACTS_COUNT="select count(*) from Department department where department.location IS NOT NULL AND department.actShedule IS NOT NULL";
	
	@Query(GET_LOCATION_WISE_ACTS_COUNT)
	public Long findLocationWiseActsCount();
	
	public Department findByCodeAndLocation_Id(String code,Long id);

	public Department findByIdAndLocation_Id(Long deptId, Long id);

}
