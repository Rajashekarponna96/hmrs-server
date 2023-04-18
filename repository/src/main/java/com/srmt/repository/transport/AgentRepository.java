package com.srmt.repository.transport;


import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.transport.Agent;


@Repository
public interface AgentRepository extends PagingAndSortingRepository<Agent, Long>,JpaSpecificationExecutor<Agent> {


	List<Agent> findByAgentNameOrAgentCode(String agentName, String agentCode);

	List<Agent> findByStation_IdOrderByAgentNameDesc(Long id);





}
