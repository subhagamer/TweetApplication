package com.tweetapp.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ReplyModel {
	
	public ReplyModel(long tweetId, String tweet, LocalDateTime tweetPostDate, boolean edited, String tweetedBy,
			LocalDateTime editedDate, long parentTweetId, boolean deleted,String profileColor,String initials) {
		this.tweet=tweet;
		this.tweetedBy=tweetedBy;
		this.tweetId=tweetId;
		this.parentTweetId=parentTweetId;
		this.deleted=deleted;
		this.tweetPostDate=tweetPostDate;
		this.edited=edited;
		this.editedDate=editedDate;
		this.profileColor=profileColor;
		this.initials=initials;
	}

	long tweetId;
	
	String profileColor;
	
	String initials;
	
	String tweet;
	
	LocalDateTime tweetPostDate;
	
	Boolean edited;
	
	String tweetedBy;
	
	LocalDateTime editedDate;
	
	long parentTweetId;
	
	Boolean deleted;
	
	List<String> likedBy;

}
