package com.srmt.service.usermanagement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srmt.model.usermanagement.Feature;
import com.srmt.model.usermanagement.FeatureAction;
import com.srmt.model.usermanagement.Role;
import com.srmt.repository.usermanagement.FeatureActionRepository;
import com.srmt.repository.usermanagement.FeatureRepository;
import com.srmt.repository.usermanagement.RoleRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class RoleServiceImpl extends GenericServiceImpl<Role, Long> implements
		RoleService {
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private FeatureRepository featureRepository;
	@Autowired
	private FeatureActionRepository featureActionRepository;

	public RoleServiceImpl() {
		super(Role.class);

	}

	@Override
	public void add(Role role) {
		for (FeatureAction featureAction : role.getFeatureActions()) {
			featureAction.setRole(role);
		}
		super.add(Role.class, role.getName(),
				genericSpecification.findByProperty("name", role.getName()),
				role);

		// roleRepository.save(role);
	}

	@Override
	public void upadte(Long id, Role role) {
		Role role1 = roleRepository.findOne(id);

		Role roleByName = roleRepository.findByName(role.getName());
		if (roleByName != null && roleByName.getId() != id) {

			throw new RuntimeException("Role Name #[" + role.getName()
					+ "] already exists.");
		}

		role1.setDisplayName(role.getDisplayName());
		role1.setName(role.getName());
		for (FeatureAction featureAction : role.getFeatureActions()) {
			featureAction.setRole(role1);
		}
		role1.setFeatureActions(role.getFeatureActions());
		roleRepository.save(role1);
	}

	@Override
	public Long getCount() {

		return super.count();
	}

	@Override
	public void deleteById(Long id) {
		super.delete(id);

	}

	@Override
	public List<Role> getAll() {

		return (List<Role>) roleRepository.findAll();
	}

	@Override
	public List<FeatureAction> getFeatureActions(Long roleId) {
		return featureActionRepository.findByRole_id(roleId);
	}

}
