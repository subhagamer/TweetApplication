package com.tweetapp.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
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
@Document(value = "loginrecord")
public class UserLoginRecord {
	
	public UserLoginRecord(String username, LocalDateTime loggedIn,LocalDateTime expiresAt) {
		this.loggedIn=loggedIn;
		this.expiresAt=expiresAt;
		this.username=username;
	}
	@Transient
	public static final String SEQUENCE_NAME = "login_record_sequence";

	@Id
	@Column
	private long login_id;
	@Column
	private String username;
	@Column
	private LocalDateTime loggedIn;
	@Column
	private LocalDateTime expiresAt;
	
	private String token;
}
