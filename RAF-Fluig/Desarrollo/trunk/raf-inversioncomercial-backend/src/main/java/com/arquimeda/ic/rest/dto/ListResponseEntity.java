package com.arquimeda.ic.rest.dto;

public class ListResponseEntity<T> extends ResponseEntity<T> {

	protected Long totalItems;
	
	public ListResponseEntity(T data, Long totalITems) {
		super(data);
		this.totalItems = totalITems;
	}
	
	public static <T> ListResponseEntity<T> of(T data, Long totalItems) {
		return new ListResponseEntity<T>(data, totalItems);
	}

	public Long getTotalItems() {
		return totalItems;
	}

	public void setTotalItems(Long totalItems) {
		this.totalItems = totalItems;
	}
	
}
