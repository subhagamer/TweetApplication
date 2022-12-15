package com.tweetapp.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "tweets")
public class Tweets {
	@Transient
	public static final String SEQUENCE_NAME = "tweets_sequence";
	
	@Id
	long tweetId;
	
	String tweet;
	
	LocalDateTime tweetPostDate;
	
	String tweetedBy;  //username
	
	boolean edited;
	
	LocalDateTime editedDate;
	
	List<String> likedBy;
	
	long parentTweetId;
	
	boolean deleted;
	
	String initials;
	
	String profileColor;
	
}
