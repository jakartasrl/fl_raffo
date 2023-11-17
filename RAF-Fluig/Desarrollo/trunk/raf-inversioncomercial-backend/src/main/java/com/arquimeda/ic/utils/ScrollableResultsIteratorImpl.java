package com.arquimeda.ic.utils;

import java.util.Iterator;

import org.hibernate.ScrollableResults;

public class ScrollableResultsIteratorImpl<ENTITY> implements Iterator<ENTITY>{

	private ScrollableResults scrollableResult = null;
	
	public ScrollableResultsIteratorImpl(ScrollableResults scrollableResult) {
		this.scrollableResult = scrollableResult;
	}

	public boolean hasNext() {
		return scrollableResult.next();
	}

	@SuppressWarnings("unchecked")
	public ENTITY next() {
		return (ENTITY) scrollableResult.get()[0];
	}

	@Override
	public void remove() {
		throw new UnsupportedOperationException("remove not supported");      
	}
	
}