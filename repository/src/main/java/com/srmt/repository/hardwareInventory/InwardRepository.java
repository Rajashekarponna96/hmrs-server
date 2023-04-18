package com.srmt.repository.hardwareInventory;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hardwareInventory.Inward;
@Repository
public interface InwardRepository extends PagingAndSortingRepository<Inward,Long> {

	List<Inward> findByItemOrCode(String item, String code);

}
