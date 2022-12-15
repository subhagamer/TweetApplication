package com.tweetapp.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tweetapp.entity.DatabaseSequence;
import com.tweetapp.entity.User;
import com.tweetapp.entity.UserLoginRecord;
import com.tweetapp.exception.UserExistException;
import com.tweetapp.model.UserClaim;
import com.tweetapp.repository.DatabaseSequenceRepository;
import com.tweetapp.repository.RegisterUserRepository;
import com.tweetapp.repository.UserLoginRecordRepository;

@Service
public class RegisterLoginService {

	@Autowired
	private RegisterUserRepository registerUserRepository;
	@Autowired
	private UserLoginRecordRepository loginRecordRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private DatabaseSequenceRepository databaseSequenceRepository;
	@Value("${jwt.expire}")
	private int JWT_TOKEN_EXPIRE;
	
	public User registerUser(User register) throws UserExistException {
		if(userExists(register)) {
			throw new UserExistException("Username already exists");
		}
		register.setPassword(passwordEncoder.encode(register.getPassword()));
		register.setProfileColor(generateColor());
		return registerUserRepository.save(register);	
	}
	public boolean userExists(User login) {
		List<User> userList=registerUserRepository.findByUsername(login.getUsername());
		return userList.size()>0;
	}
	public boolean loginUser(User login) {
		List<User> userList=registerUserRepository.findByUsername(login.getUsername());
		return userList.stream().anyMatch(user->passwordEncoder.matches(login.getPassword(),user.getPassword()));
	}

	public UserLoginRecord saveRecord(User user) {
		LocalDateTime loggedIn=LocalDateTime.now();
		
		LocalDateTime expiresAt=loggedIn.plusMinutes(JWT_TOKEN_EXPIRE);
		UserLoginRecord urecord=new UserLoginRecord(user.getUsername(),loggedIn,expiresAt);
		urecord.setLogin_id(generateSequence(UserLoginRecord.SEQUENCE_NAME));
		return loginRecordRepository.save(urecord);
	}
	
	public long generateSequence(String seqName) {
	    List<DatabaseSequence> ids= databaseSequenceRepository.findIdBySeq(seqName);
	    long id;
	    if(!ids.isEmpty()) {
	    	Comparator<DatabaseSequence> comparator = Comparator.comparing( DatabaseSequence::getId );
	    	 id=ids.stream().max(comparator).get().getId()+1;
	    	 
	    }
	    else {
	    	id=1;
	    }
	    DatabaseSequence databaseSequence=new DatabaseSequence(id,seqName);
	    databaseSequenceRepository.save(databaseSequence);
	    return id;
	}
	
	public List<User> forgotPassword(String username){
		return registerUserRepository.findByUsername(username);
		
	}

	public User getUserFromUserNameAndPassword(User login) {
		User user=registerUserRepository.findByUsername(login.getUsername()).get(0);
		user.setPassword(login.getPassword());
		return user;
	}
	public String generateColor() {
		Random r=new Random();
		int color=r.nextInt((5-1)+1)+1;
		switch(color) {
		case 1:
			return "yellow";
		case 2:
			return "green";
		case 3:
			return "purple";
		case 4:
			return "red";
		case 5:
			return "black";
		}
		return "orange";
	}
	public String changePassword(String username,UserClaim userClaim) {
		User user=registerUserRepository.findByUsername(username).get(0);
		registerUserRepository.deleteUserByUsername(username);
		user.setPassword(passwordEncoder.encode(userClaim.getPassword()));
		registerUserRepository.save(user);
		return "Password is reset successfully!!";
	}

}
