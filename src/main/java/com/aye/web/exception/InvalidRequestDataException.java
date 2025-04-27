package com.aye.web.exception;

public class InvalidRequestDataException extends RuntimeException{

    public InvalidRequestDataException(String message) {
        super(message);
    }
}
