package com.tweetapp.entity;

import javax.persistence.Column;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("user")
public class User {
	@Id
	@Column
	String username;
	@Column
	String password;
	@Column
	String firstName;
	@Column
	String lastName;
	@Column
	String email;
	@Column
	String gender;
	@Column
	String usertype;
	@Column
	String profileColor;
}
