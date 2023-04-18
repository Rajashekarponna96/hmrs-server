package com.srmt.tdv.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomUserDetailsService userDetailsService;

	/**
	 * This section defines the user accounts which can be used for
	 * authentication as well as the roles each user has.
	 */
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**")
				.antMatchers(HttpMethod.GET, "/broadcastMessage/activeMessage");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		/*
		 * List<Role> roleList = roleService.getAll();
		 * 
		 * String[] roles = new String[roleList.size()];
		 * 
		 * for (int roleIndex = 0; roleIndex < roleList.size(); roleIndex++) {
		 * roles[roleIndex] = roleList.get(roleIndex).getName(); }
		 * 
		 * http.httpBasic().and().authorizeRequests()
		 * .antMatchers(HttpMethod.GET, "/**").hasAnyAuthority(roles)
		 * .antMatchers(HttpMethod.POST, "/**").hasAnyAuthority(roles)
		 * .antMatchers(HttpMethod.PUT, "/**").hasAnyAuthority(roles)
		 * .antMatchers(HttpMethod.DELETE, "/**").hasAnyAuthority(roles)
		 * 
		 * .antMatchers(HttpMethod.OPTIONS, "/**").hasAnyAuthority(roles)
		 * 
		 * .and().csrf().disable(); http.headers().frameOptions().disable();
		 */

		http.httpBasic().and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/**").permitAll()
				.antMatchers(HttpMethod.POST, "/**").permitAll()
				.antMatchers(HttpMethod.PUT, "/**").permitAll()
				.antMatchers(HttpMethod.DELETE, "/**").permitAll().and().csrf()
				.disable();
		http.headers().frameOptions().disable();
	}
}
