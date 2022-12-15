package com.tweetapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tweetapp.entity.Tweets;

public interface TweetRepository extends MongoRepository<Tweets, Long>{

	List<Tweets> findTweetByTweetIdAndTweetedBy(long tweetId,String username);
	void deleteTweetByTweetIdAndTweetedBy(long tweetId,String username);
	void deleteByTweetId(long tweetid);
	List<Tweets> findTweetByTweetId(long tweetid);
	List<Tweets> findAllTweetsByTweetedByOrderByTweetId(String username);
	List<Tweets> findAllTweetsByParentTweetIdOrderByTweetId(long tweetId);
	List<Tweets> findAllByOrderByTweetIdAsc();
}
