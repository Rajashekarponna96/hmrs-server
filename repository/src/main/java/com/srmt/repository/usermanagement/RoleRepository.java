package com.srmt.repository.usermanagement;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.usermanagement.Role;
@Repository
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {

	Role findByName(String name);

}
