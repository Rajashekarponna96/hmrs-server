package com.srmt.tdv.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.srmt.model.usermanagement.User;

public class AuditorAwareImpl implements AuditorAware<String> {

	@Override
	public String getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}

		System.out.println(SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal());
		return ((User) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal()).getUserName();
	}
}
