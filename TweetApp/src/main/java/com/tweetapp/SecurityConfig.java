package com.tweetapp;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.tweetapp.component.CustomJwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private CustomJwtAuthenticationFilter customJwtAuthenticationFilter;
	
@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
            .withUser("user").password("password").roles("USER")
            .and()
            .withUser("admin").password("password").roles("ADMIN");
}

protected void configure(HttpSecurity http) throws Exception {
	 CorsConfiguration corsConfiguration = new CorsConfiguration();
	 corsConfiguration.applyPermitDefaultValues();
     corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT"));
     
     
    http.cors().configurationSource(request -> corsConfiguration).and()
        .authorizeRequests()
            .antMatchers(HttpMethod.POST,"/form").hasRole("ADMIN")  // Specific api method request based on role.
            .antMatchers("/api/v1.0/tweets/register","/api/v1.0/tweets/login",
            		"/api/v1.0/tweets/{username:[a-z]+}/forgot").permitAll()  // permited urls to guest users(without login).
            .anyRequest().authenticated()
            .and()
        .formLogin()       // not specified form page to use default login page of spring security.
            .permitAll()
             .and()
        .logout().deleteCookies("JSESSIONID")  // delete memory of browser after logout.

        .and()
        .rememberMe().key("uniqueAndSecret"); // remember me check box enabled.

    http.csrf().disable();  // ADD THIS CODE TO DISABLE CSRF IN PROJECT.**
    http.addFilterBefore(customJwtAuthenticationFilter, 
    		UsernamePasswordAuthenticationFilter.class);
}
@Bean
public PasswordEncoder passwordEncoder() {
   PasswordEncoder encoder = new BCryptPasswordEncoder();
   return encoder;
}
}