package com.tweetapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tweetapp.entity.User;

public interface RegisterUserRepository extends MongoRepository<User, String>{
	public List<User> findByUsername(String username);

	public List<User> findByUsernameRegex(String username);
	
	public void deleteUserByUsername(String username);
}
