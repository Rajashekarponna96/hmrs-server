package com.srmt.service;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.rest.model.Copyable;
import com.srmt.rest.model.IEntity;

public interface GenericService<E extends IEntity<E> & Copyable<E>, S extends Serializable> {

	E findBy(Class<E> clazz, S id);

	List<E> findAll(Integer page, Integer size);

	List<E> findAll(Specification<E> specification, Integer page, Integer size);

	long count();

	List<E> findAll();
}
