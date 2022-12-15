package com.tweetapp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.tweetapp.entity.DatabaseSequence;
import com.tweetapp.entity.Tweets;
import com.tweetapp.entity.User;
import com.tweetapp.exception.NoTweetPresentException;
import com.tweetapp.exception.TweetUpdateError;
import com.tweetapp.model.ReplyModel;
import com.tweetapp.model.TweetModel;
import com.tweetapp.model.UserModel;
import com.tweetapp.repository.DatabaseSequenceRepository;
import com.tweetapp.repository.RegisterUserRepository;
import com.tweetapp.repository.TweetRepository;

@Service
public class TweetService {

	@Autowired
	private TweetRepository tweetRepository;
	@Autowired
	private RegisterUserRepository registerUserRepository;
	@Autowired
	private DatabaseSequenceRepository databaseSequenceRepository;
	@Autowired
	MongoTemplate mongoTemplate;

	public List<TweetModel> getAllTweets() {
		List<Tweets> tweetList = tweetRepository.findAllByOrderByTweetIdAsc();
		List<TweetModel> tweetsList = new ArrayList<>();
		tweetList.stream().forEach(t -> {
			if (t.getParentTweetId() == -1) {
				TweetModel tweetModel = new TweetModel(t.getTweetId(), t.getTweet(), t.getTweetPostDate(), t.isEdited(),
						t.getTweetedBy(), t.getEditedDate(), t.getParentTweetId(), t.isDeleted(), t.getProfileColor(),
						t.getInitials());
				List<Tweets> tweetReplyList = tweetRepository
						.findAllTweetsByParentTweetIdOrderByTweetId(t.getTweetId());
				List<ReplyModel> tweetsReplyList = new ArrayList<>();
				tweetReplyList.stream().forEach(u -> {
					ReplyModel tweetReplyModel = new ReplyModel(u.getTweetId(), u.getTweet(), u.getTweetPostDate(),
							u.isEdited(), u.getTweetedBy(), u.getEditedDate(), u.getParentTweetId(), u.isDeleted(),
							u.getProfileColor(), u.getInitials());
					tweetReplyModel.setLikedBy(u.getLikedBy());
					tweetsReplyList.add(tweetReplyModel);
				});
				tweetModel.setReply(tweetsReplyList);
				tweetModel.setLikedBy(t.getLikedBy());
				tweetsList.add(tweetModel);
			}
		});
		return tweetsList;
	}

	public List<UserModel> getAllUsers() {

		List<User> userList = registerUserRepository.findAll();
		List<UserModel> uModel = new ArrayList<>();
		userList.stream().forEach(u -> {
			UserModel userModel = new UserModel();
			userModel.setEmail(u.getEmail());
			userModel.setUsername(u.getUsername());
			userModel.setName(u.getFirstName() + " " + u.getLastName());
			userModel.setProfileColor(u.getProfileColor());
			userModel.setGender(u.getGender());
			uModel.add(userModel);
		});
		return uModel;

	}

	public List<UserModel> searchUsersByUsername(String username) {

		List<User> userList = registerUserRepository.findByUsernameRegex(".*" + username + ".*");
		List<UserModel> uModel = new ArrayList<>();
		userList.stream().forEach(u -> {
			UserModel userModel = new UserModel();
			userModel.setEmail(u.getEmail());
			userModel.setUsername(u.getUsername());
			userModel.setName(u.getFirstName() + " " + u.getLastName());
			uModel.add(userModel);
		});
		return uModel;
	}

	public List<TweetModel> getAllUserTweets(String username) {

		List<Tweets> tweetList = tweetRepository.findAllTweetsByTweetedByOrderByTweetId(username);
		List<TweetModel> tweetsList = new ArrayList<>();
		tweetList.stream().forEach(t -> {
				TweetModel tweetModel = new TweetModel(t.getTweetId(), t.getTweet(), t.getTweetPostDate(), t.isEdited(),
						t.getTweetedBy(), t.getEditedDate(), t.getParentTweetId(), t.isDeleted(), t.getProfileColor(),
						t.getInitials());

//				List<Tweets> tweetReplyList = tweetRepository
//						.findAllTweetsByParentTweetIdOrderByTweetId(t.getTweetId());
//				List<ReplyModel> tweetsReplyList = new ArrayList<>();
//				tweetReplyList.stream().forEach(u -> {
//					ReplyModel tweetReplyModel = new ReplyModel(u.getTweetId(), u.getTweet(), u.getTweetPostDate(),
//							u.isEdited(), u.getTweetedBy(), u.getEditedDate(), u.getParentTweetId(), u.isDeleted(),
//							u.getProfileColor(), u.getInitials());
//					tweetsReplyList.add(tweetReplyModel);
//				});
				tweetModel.setLikedBy(t.getLikedBy());
//				tweetModel.setReply(tweetsReplyList);
				tweetsList.add(tweetModel);
		});
		return tweetsList;
	}

	public Tweets addTweet(String username, Tweets tweet) {
		tweet.setEdited(false);
		tweet.setTweetedBy(username);
		tweet.setLikedBy(new ArrayList<>());
		tweet.setTweetPostDate(LocalDateTime.now());
		tweet.setTweetId(generateSequence(Tweets.SEQUENCE_NAME));
		tweet.setDeleted(false);
		User user = registerUserRepository.findByUsername(username).get(0);
		tweet.setProfileColor(user.getProfileColor());
		tweet.setInitials(user.getFirstName().charAt(0) + "" + user.getLastName().charAt(0));
		if (!(tweet.getParentTweetId() > 0))
			tweet.setParentTweetId(-1);
		return tweetRepository.save(tweet);

	}

	public long generateSequence(String seqName) {
		List<DatabaseSequence> ids = databaseSequenceRepository.findIdBySeq(seqName);
		long id;
		if (!ids.isEmpty()) {
			id = ids.get(0).getId();
			databaseSequenceRepository.deleteBySeq(seqName);
		} else {
			id = 1;
		}
		DatabaseSequence databaseSequence = new DatabaseSequence(id + 1, seqName);
		databaseSequenceRepository.save(databaseSequence);
		return id;
	}

	public Tweets updateTweet(String username, long tweetid, Optional<TweetModel> tModel) throws TweetUpdateError {

		List<Tweets> tweet = tweetRepository.findTweetByTweetIdAndTweetedBy(tweetid, username);
		if (tModel.isPresent() && !tweet.isEmpty()) {
			Tweets modifyTweet = tweet.get(0);
			modifyTweet.setTweet(tModel.get().getTweet());
			modifyTweet.setEdited(true);
			modifyTweet.setEditedDate(LocalDateTime.now());
			tweetRepository.deleteByTweetId(tweetid);
			return tweetRepository.save(modifyTweet);
		} else {
			throw new TweetUpdateError("Failed To Update Tweet!Please try again later");
		}
	}

	public void deleteTweet(String username, long tweetid) throws NoTweetPresentException {
		List<Tweets> tweet = tweetRepository.findTweetByTweetIdAndTweetedBy(tweetid, username);
		if (!tweet.isEmpty()) {
			Tweets t = tweet.get(0);
			if (t.isDeleted())
				throw new NoTweetPresentException("Tweet is not present");
			t.setTweet("TWEET HAS BEEN DELETED");
			t.setDeleted(true);
			tweetRepository.deleteTweetByTweetIdAndTweetedBy(tweetid, username);
			tweetRepository.save(t);
		} else {
			throw new NoTweetPresentException("Tweet is not present");
		}

	}

	public String likeTweet(String username, long tweetid) throws NoTweetPresentException {
		List<Tweets> tweet = tweetRepository.findTweetByTweetId(tweetid);
		String msg = "Tweet Liked";
		if (!tweet.isEmpty()) {
			Tweets t = tweet.get(0);
			List<String> l = t.getLikedBy();
			if (l != null && l.contains(username)) {
				l.remove(username);
				msg = "Unliked the tweet";
			} else {
				if (l == null)
					l = Arrays.asList(username);
				else
					l.add(username);
			}

			t.setLikedBy(l);
			tweetRepository.deleteByTweetId(tweetid);
			tweetRepository.save(t);

		} else {
			throw new NoTweetPresentException("Tweet is not present");
		}
		return msg;
	}

	public ReplyModel replyTweet(String username, long tweetid, ReplyModel model) throws NoTweetPresentException {
		List<Tweets> tweet = tweetRepository.findTweetByTweetIdAndTweetedBy(tweetid, username);
		if (!tweet.isEmpty()) {
			Tweets tweets = new Tweets();
			tweets.setTweet(model.getTweet());
			tweets.setEdited(false);
			tweets.setLikedBy(new ArrayList<String>());
			tweets.setTweetedBy(username);
			tweets.setTweetPostDate(LocalDateTime.now());
			tweets.setTweetId(generateSequence(Tweets.SEQUENCE_NAME));
			tweets.setParentTweetId(tweetid);
			tweets = tweetRepository.save(tweets);
			User user = registerUserRepository.findByUsername(username).get(0);
			ReplyModel replyModel = new ReplyModel(tweets.getTweetId(), tweets.getTweet(), tweets.getTweetPostDate(),
					false, tweets.getTweetedBy(), tweets.getEditedDate(), tweetid, false, user.getProfileColor(),
					user.getFirstName().charAt(0) + "" + user.getLastName().charAt(0));
			return replyModel;
		} else {
			throw new NoTweetPresentException("Tweet is not present");
		}

	}
}
