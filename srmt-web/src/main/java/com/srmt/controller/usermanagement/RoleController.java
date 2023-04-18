package com.srmt.controller.usermanagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.usermanagement.FeatureAction;
import com.srmt.model.usermanagement.Role;
import com.srmt.service.usermanagement.RoleService;

@RestController
@RequestMapping(value = "/role")
public class RoleController {

	@Autowired
	private RoleService roleService;

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(@RequestBody Role role) {
		roleService.add(role);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void upadte(@PathVariable("id") Long id, @RequestBody Role role) {
		roleService.upadte(id, role);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		roleService.deleteById(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Role> findByPageAndSize(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return roleService.findAll(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {

		return roleService.getCount();
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Role> getAll() {
		return roleService.getAll();
	}

	@RequestMapping(value = "/{id}/featureActions", method = RequestMethod.POST)
	public void addFeatureActionToRole(@PathVariable("id") Long id,
			@RequestBody Role role) {

	}
	
	@RequestMapping(value = "/{id}/featureActions", method = RequestMethod.GET)
	public List<FeatureAction> getFeatureActionsByRoleId(@PathVariable("id") Long id) {
		return roleService.getFeatureActions(id);
	}

}
