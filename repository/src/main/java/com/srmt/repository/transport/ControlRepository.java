package com.srmt.repository.transport;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.transport.Control;



@Repository
public interface ControlRepository extends PagingAndSortingRepository<Control, Long> {

	List<Control> findByNameOrCode(String name, String code);

}
