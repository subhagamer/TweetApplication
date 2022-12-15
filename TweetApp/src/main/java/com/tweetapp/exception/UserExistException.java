package com.tweetapp.exception;

public class UserExistException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2325862384228385313L;

	public UserExistException(String msg) {
		super(msg);
	}
}
