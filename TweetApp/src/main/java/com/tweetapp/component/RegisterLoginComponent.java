package com.tweetapp.component;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.entity.User;
import com.tweetapp.entity.UserLoginRecord;
import com.tweetapp.model.UserClaim;
import com.tweetapp.service.RegisterLoginService;
import com.tweetapp.util.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@SuppressWarnings("rawtypes")
public class RegisterLoginComponent {
	@Autowired
	private RegisterLoginService registerLoginService;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@PostMapping("api/v1.0/tweets/register")
	public ResponseEntity registerUser(@RequestBody User register) {
		try {
			User result = registerLoginService.registerUser(register);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("api/v1.0/tweets/login")
	public ResponseEntity loginUser(@RequestBody Optional<User> login) {
		if (login.isPresent()) {
			if (registerLoginService.loginUser(login.get())) {
				User user = registerLoginService.getUserFromUserNameAndPassword(login.get());
				String token = jwtTokenUtil.generateToken(user);
				UserLoginRecord urecord = registerLoginService.saveRecord(login.get());
				urecord.setToken(token);
				return new ResponseEntity<>(urecord, HttpStatus.OK);
			}
		}
		return new ResponseEntity<>("Incorrect Response", HttpStatus.UNAUTHORIZED);
	}

	@GetMapping("api/v1.0/tweets/{username}/forgot")
	public ResponseEntity forgotPassword(@PathVariable(value = "username") String username) {
		List<User> userList = registerLoginService.forgotPassword(username);
		if (userList.isEmpty()) {
			return new ResponseEntity<>("Username not found", HttpStatus.NOT_FOUND);
		} else {
			User user = userList.get(0);
			user.setPassword("XXXXXXXXXX");
			user.setEmail(getPartialEmail(user.getEmail()));
			return new ResponseEntity<User>(user, HttpStatus.OK);
		}
	}

	@PutMapping("api/v1.0/tweets/{username}/forgot")
	public ResponseEntity resetPassword(@PathVariable(value = "username") String username,
			@RequestBody UserClaim userClaim) {
		List<User> userList = registerLoginService.forgotPassword(username);
		if (userList.isEmpty()) {
			return new ResponseEntity<>("Username not found", HttpStatus.NOT_FOUND);
		} else {
			User user = userList.get(0);
			if (!(userClaim.getPassword().equals(userClaim.getConfirmPassword())))
				return new ResponseEntity<>("Password and Confirm Password is different", HttpStatus.NOT_FOUND);
			if (user.getEmail().toLowerCase().equals(userClaim.getEmail().trim().toLowerCase())) {
				return new ResponseEntity<>(registerLoginService.changePassword(username, userClaim),
						HttpStatus.OK);
			} else
				return new ResponseEntity<>("Email is incorrect", HttpStatus.NOT_FOUND);

		}
	}

	@GetMapping("api/v1.0/tweets/validate")
	public ResponseEntity validateToken() {
		return new ResponseEntity<>("Valid Token", HttpStatus.OK);

	}

	public String getPartialEmail(String email) {
		String res = email.charAt(0) + "******@" + email.split("@")[1].charAt(0) + "**.com";
		return res;
	}

}
