package com.srmt.service;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import com.srmt.repository.validator.EntityPersistanceValidator;
import com.srmt.rest.model.Copyable;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.repository.GenericSpecification;

@Transactional
public abstract class GenericServiceImpl<E extends IEntity<E> & Copyable<E>, S extends Serializable>
		implements GenericService<E, S> {
	@Autowired
	private EntityManager em;

	protected SimpleJpaRepository<E, S> baseRepository;

	protected EntityPersistanceValidator<E, S> entityPersistanceValidator;

	private Class<E> clazz;

	protected GenericSpecification genericSpecification;

	public GenericServiceImpl(Class<E> clazz) {
		this.clazz = clazz;
		genericSpecification = new GenericSpecification();
	}

	@PostConstruct
	public void init() {
		baseRepository = new SimpleJpaRepository<E, S>(clazz, em);
		entityPersistanceValidator = new EntityPersistanceValidator<E, S>(
				baseRepository);
	}

	protected void add(Class<E> clazz, Object value,
			Specification<E> specification, E entity) {

		if (specification != null) {
			entityPersistanceValidator.isNew(clazz, value, specification);
		}

		baseRepository.save(entity);
	}

	protected <P, PS extends Serializable> void add(Class<P> parentClass,
			PS id, E entity, Specification<E> specification) {
		SimpleJpaRepository<P, PS> parentRepository = new SimpleJpaRepository<P, PS>(
				parentClass, em);
		P parentEntity = parentRepository.findOne(id);

		if (parentEntity == null) {
			throw new RuntimeException(parentClass.getSimpleName() + " #[" + id
					+ "] does not exist");
		}

		if (specification != null) {
			entityPersistanceValidator.findDuplicateBySpec(clazz, entity,
					specification);
		}

		try {
			Method setter = clazz.getDeclaredMethod(
					"set" + parentClass.getSimpleName(), parentClass);

			setter.invoke(entity, parentEntity);

			baseRepository.save(entity);
		} catch (Exception e) {
			throw new RuntimeException("No setter method found in class "
					+ clazz.getName() + " for property " + parentClass, e);
		}
	}

	@Override
	public E findBy(Class<E> clazz, S id) {
		return entityPersistanceValidator.findById(clazz, id);
	}

	@Override
	public List<E> findAll(Integer page, Integer size) {
		return baseRepository.findAll(new PageRequest(page, size)).getContent();
	}

	@Override
	public List<E> findAll(Specification<E> specification, Integer page,
			Integer size) {
		return baseRepository.findAll(specification,
				new PageRequest(page, size)).getContent();
	}

	protected void update(Class<E> clazz, S id, Specification<E> specification,
			E entity) throws Exception {
		E existingEntity = entityPersistanceValidator.findById(clazz, id);

		if (specification != null) {
			entityPersistanceValidator.findDuplicateBySpec(clazz, entity,
					specification);
		}

		entity.copy(existingEntity);
		baseRepository.save(existingEntity);
	}

	public void delete(S id) {
		if (baseRepository.exists(id)) {
			baseRepository.delete(id);
		}
	}

	public List<E> findAll() {
		return baseRepository.findAll();
	}

	@Override
	public long count() {
		return baseRepository.count();
	}
}
