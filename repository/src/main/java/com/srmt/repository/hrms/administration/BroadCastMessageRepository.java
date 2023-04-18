package com.srmt.repository.hrms.administration;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.BroadCastMessage;

@Repository
public interface BroadCastMessageRepository extends
		PagingAndSortingRepository<BroadCastMessage, Long>,
		JpaSpecificationExecutor<BroadCastMessage> {

	String ACTIVE_MESSAGES = "select broadCastMessage from BroadCastMessage broadCastMessage where broadCastMessage.toValid>=:now and broadCastMessage.validFrom<=:now";

	BroadCastMessage findByName(String name);

	List<BroadCastMessage> findByMessageType(String messageType);

	@Query(ACTIVE_MESSAGES)
	List<BroadCastMessage> findByValidFromAfter(@Param("now") LocalDate now);

}
