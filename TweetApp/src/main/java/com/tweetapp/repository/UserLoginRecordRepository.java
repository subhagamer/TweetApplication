package com.tweetapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tweetapp.entity.UserLoginRecord;

public interface UserLoginRecordRepository extends MongoRepository<UserLoginRecord, Integer>{

}
