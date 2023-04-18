package com.srmt.service.usermanagement;

import java.util.List;

import com.srmt.model.usermanagement.User;
import com.srmt.service.GenericService;

public interface UserService extends GenericService<User, Long> {

	void add(User user);

	void update(Long id, User user) throws Exception;

	Long getCount();

	List<User> getAll();

	void deleteById(Long id);

	User dologin(User user);

	User dologinForSalesRep(User user);

}
