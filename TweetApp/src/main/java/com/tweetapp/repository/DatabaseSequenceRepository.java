package com.tweetapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tweetapp.entity.DatabaseSequence;

public interface DatabaseSequenceRepository extends MongoRepository<DatabaseSequence, Integer>{
	public List<DatabaseSequence> findIdBySeq(String seq);
	
	public void deleteBySeq(String seq);
}
