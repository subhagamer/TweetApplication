package com.tweetapp.component;

import java.util.List;
import java.util.Optional;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.entity.Tweets;
import com.tweetapp.model.LikeModel;
import com.tweetapp.model.ReplyModel;
import com.tweetapp.model.TweetModel;
import com.tweetapp.model.UserModel;
import com.tweetapp.service.TweetService;
import org.json.*; 
@RestController
@SuppressWarnings("rawtypes")
public class TweetComponent {
	
	@Autowired
	private TweetService tweetService;
	
	@GetMapping("api/v1.0/tweets/all")
	public ResponseEntity getAllTweets() {
		List<TweetModel> allTweets= tweetService.getAllTweets();
		if(allTweets.isEmpty()) {
			return new ResponseEntity<>("No tweets found",HttpStatus.NO_CONTENT);
		}
		else {
			return new ResponseEntity<List<TweetModel>>(allTweets,HttpStatus.OK);
		}
		
	}
	@GetMapping("api/v1.0/tweets/users/all")
	public ResponseEntity getAllUsers() {
		List<UserModel> allUsers= tweetService.getAllUsers();
		if(allUsers.isEmpty()) {
			return new ResponseEntity<>("No Users found",HttpStatus.NO_CONTENT);
		}
		else {
			return new ResponseEntity<>(allUsers,HttpStatus.OK);
		}
		
	}
	@GetMapping("api/v1.0/tweets/user/search/{username}")
	public ResponseEntity searchUser(@PathVariable(value="username")String username) {
		List<UserModel> allUsers= tweetService.searchUsersByUsername(username);
		if(allUsers.isEmpty()) {
			return new ResponseEntity<>("No Users found",HttpStatus.NO_CONTENT);
		}
		else {
			return new ResponseEntity<>(allUsers,HttpStatus.OK);
		}
	}
	@GetMapping("api/v1.0/tweets/{username}")
	public ResponseEntity getAllUserTweets(@PathVariable(value="username")String username) {
		List<TweetModel> allTweetsByUser;
		allTweetsByUser = tweetService.getAllUserTweets(username);
		if(allTweetsByUser.isEmpty()) {
			return new ResponseEntity<>("No Tweets found for that user",HttpStatus.NO_CONTENT);
		}
		else {
			return new ResponseEntity<>(allTweetsByUser,HttpStatus.OK);
		}
	}
	@PostMapping("api/v1.0/tweets/{username}/add")
	public ResponseEntity addTweet(@PathVariable(value="username")String username,@RequestBody Tweets tweet) {
		try {
			Tweets tweets=tweetService.addTweet(username,tweet);
			return new ResponseEntity<>(tweets,HttpStatus.OK);
		}catch(Exception e) {
			
			return new ResponseEntity<>("Error Adding Tweet",HttpStatus.BAD_REQUEST);
		}
	}
	@PutMapping("api/v1.0/tweets/{username}/update/{id}")
	public ResponseEntity updateTweet(@PathVariable(value="username")String username,
			@PathVariable(value="id") long tweetid,@RequestBody Optional<TweetModel> tweet) {
		try {
			Tweets tweets=tweetService.updateTweet(username,tweetid,tweet);
			return new ResponseEntity<Tweets>(tweets,HttpStatus.OK);
		}catch(Exception e) {
			
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	@DeleteMapping("api/v1.0/tweets/{username}/delete/{id}")
	public ResponseEntity deleteTweet(@PathVariable(value="username")String username,
			@PathVariable(value="id") long tweetid) {
		try {
			tweetService.deleteTweet(username,tweetid);
			return new ResponseEntity<>("Tweet Deleted",HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	@PutMapping("api/v1.0/tweets/{username}/like/{id}")
	public ResponseEntity likeTweet(@PathVariable(value="username")String username,
			@PathVariable(value="id") long tweetid) {
		try {
  			String result=tweetService.likeTweet(username,tweetid); 
			return new ResponseEntity<>(new LikeModel(result),HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	@PostMapping("api/v1.0/tweets/{username}/reply/{id}")
	public ResponseEntity replyTweet(@PathVariable(value="username")String username,
			@PathVariable(value="id") long tweetid,@RequestBody ReplyModel model) {
		try {
			ReplyModel tweets=tweetService.replyTweet(username,tweetid,model);
			return new ResponseEntity<>(tweets,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}

}
