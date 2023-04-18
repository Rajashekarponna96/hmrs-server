package com.srmt.tdv.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.srmt.model.usermanagement.Role;
import com.srmt.model.usermanagement.User;
import com.srmt.repository.usermanagement.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	public UserRepository userRepository;

	@Autowired
	public CustomUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String userName)
			throws UsernameNotFoundException {
		User user = null;
		try {
			user = userRepository.findByUserName(userName);
		} catch (Exception e) {
			throw new RuntimeException("Invalid credentials.");
		}
		if (user == null) {
			throw new RuntimeException("Invalid credentials.");
		}

		return new UserRepositoryUserDetails(user);
	}

	private final static class UserRepositoryUserDetails extends User implements
			UserDetails {

		private static final long serialVersionUID = 1L;

		private UserRepositoryUserDetails(User user) {
			super(user);
		}

		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
			Role role = getRole();
			roles.add(new GrantedAuthority() {
				private static final long serialVersionUID = 4444348596556657300L;

				@Override
				public String getAuthority() {
					return role.getName();
				}
			});

			return roles;
		}

		@Override
		public String getUsername() {
			return getUserName();
		}

		@Override
		public boolean isAccountNonExpired() {
			return true;
		}

		@Override
		public boolean isAccountNonLocked() {
			return true;
		}

		@Override
		public boolean isCredentialsNonExpired() {
			return true;
		}

		@Override
		public boolean isEnabled() {
			return true;
		}

	}
}
