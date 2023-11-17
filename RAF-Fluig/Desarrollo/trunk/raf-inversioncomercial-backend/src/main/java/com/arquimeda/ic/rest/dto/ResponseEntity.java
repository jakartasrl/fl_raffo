package com.arquimeda.ic.rest.dto;

public class ResponseEntity<T> {

	private T data;
	private String version;
	
	public ResponseEntity(T data) {
		this.version = "v1";
		this.data = data;
	}
	
	public static <T> ResponseEntity<T> of(T data) {
		return new ResponseEntity<T>(data);
	} 

	
	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
	
}
