package com.srmt.service.usermanagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.employee.Employee;
import com.srmt.model.usermanagement.Role;
import com.srmt.model.usermanagement.User;
import com.srmt.repository.hrms.employee.EmployeeRepository;
import com.srmt.repository.usermanagement.RoleRepository;
import com.srmt.repository.usermanagement.UserRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class UserServiceimpl extends GenericServiceImpl<User, Long> implements
		UserService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	public UserServiceimpl() {
		super(User.class);

	}

	@Override
	public void add(User user) {

		Employee employee = employeeRepository.findOne(user.getEmployee()
				.getId());
		if (employee == null) {
			throw new RuntimeException("Employee ["
					+ user.getEmployee().getId() + "] does not exists.");
		}
		User byEmployee_Id = userRepository.findByEmployee_Id(user
				.getEmployee().getId());
		if (byEmployee_Id != null) {
			throw new RuntimeException("Employee with Id ["
					+ user.getEmployee().getId() + "] already exists.");
		}

		Role role = roleRepository.findOne(user.getRole().getId());
		if (role == null) {
			throw new RuntimeException("Role [" + user.getRole().getId()
					+ "] does not exists.");
		}
		user.setEmployee(employee);
		user.setRole(role);
		super.add(
				User.class,
				user.getUserName(),
				genericSpecification.findByProperty("userName",
						user.getUserName()), user);
	}

	@Override
	public void update(Long id, User user) throws Exception {
		User oldUser = userRepository.findOne(user.getId());
		oldUser.setConfirmPassword("");
		if (!oldUser.getPassword().equals(user.getConfirmPassword()))
			throw new RuntimeException("Incorrect password");
		super.update(
				User.class,
				id,
				genericSpecification.findByProperty("userName",
						user.getUserName()), user);

	}

	@Override
	public Long getCount() {

		return super.count();
	}

	@Override
	public List<User> getAll() {

		return (List<User>) userRepository.findAll();
	}

	@Override
	public void deleteById(Long id) {
		super.delete(id);

	}

	@Override
	public User dologin(User user) {
		User dbUser = userRepository.findByUserNameAndPasswordAndIsActive(
				user.getUserName(), user.getPassword(), true);
		if (dbUser == null) {
			throw new RuntimeException("Login Failed");
		}
		return dbUser;
	}

	@Override
	public User dologinForSalesRep(User user) {
		User dbUser = userRepository
				.findByUserNameAndPasswordAndIsActiveAndEmployee_SalesRepCodeIsNotNull(user.getUserName(), user.getPassword(), true);
						
		if (dbUser == null) {
			throw new RuntimeException("Login Failed");
		}
		return dbUser;
	}

}
