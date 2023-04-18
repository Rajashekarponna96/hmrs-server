package com.srmt.controller.usermanagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.usermanagement.User;
import com.srmt.service.usermanagement.UserService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody User user) {
		userService.add(user);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void upadte(@PathVariable("id") Long id, @RequestBody User user) throws Exception {
		
		userService.update(id, user);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<User> findByPageAndSize(@RequestParam("page") int page,
			@RequestParam("size") int size) {

		return userService.findAll(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return userService.getCount();

	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		userService.deleteById(id);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<User> getAll() {
		return userService.getAll();
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public User dologin(@RequestBody User user) {
		return userService.dologin(user);
	}
	@RequestMapping(value = "/login/salesRep", method = RequestMethod.POST)
	public User dologinForSalesRep(@RequestBody User user) {
		return userService.dologinForSalesRep(user);
	}

}
