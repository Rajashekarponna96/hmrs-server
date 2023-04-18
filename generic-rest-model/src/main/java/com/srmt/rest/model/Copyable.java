package com.srmt.rest.model;

public interface Copyable<E> {
	void copy(E toEntity) throws Exception;
}
