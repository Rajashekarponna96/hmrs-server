package com.srmt.service.usermanagement;

import java.util.List;

import com.srmt.model.usermanagement.FeatureAction;
import com.srmt.model.usermanagement.Role;
import com.srmt.service.GenericService;

public interface RoleService extends GenericService<Role, Long> {

	void add(Role role);

	void upadte(Long id, Role role);

	Long getCount();

	void deleteById(Long id);

	List<Role> getAll();
	
	List<FeatureAction> getFeatureActions(Long id);

}
