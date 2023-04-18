package com.srmt.repository.usermanagement;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.usermanagement.User;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

	User findByUserName(String userName);

	User findByUserNameAndPassword(String userName, String password);

	User findByUserNameAndPasswordAndIsActive(String userName, String password,
			boolean b);

	User findByEmployee_Id(Long id);


	User findByUserNameAndPasswordAndIsActiveAndEmployee_SalesRepCodeIsNotNull(String userName, String password,boolean b);
}
