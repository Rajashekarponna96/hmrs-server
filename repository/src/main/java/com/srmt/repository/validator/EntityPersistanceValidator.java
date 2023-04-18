package com.srmt.repository.validator;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

public class EntityPersistanceValidator<E, ID extends Serializable> {

	private SimpleJpaRepository<E, ID> baseRepository;

	public EntityPersistanceValidator(SimpleJpaRepository<E, ID> baseRepository) {
		this.baseRepository = baseRepository;
	}

	public E findById(Class<E> clazz, ID id) {
		E entity = baseRepository.findOne(id);

		if (entity == null) {
			throw new RuntimeException(clazz.getSimpleName() + " #[" + id
					+ "] does not exist.");
		}

		return entity;
	}

	public void isNew(Class<E> clazz, Object value,
			Specification<E> specification) {
		List<E> entities = baseRepository.findAll(specification);

		if (entities != null && !entities.isEmpty()) {
			throw new RuntimeException(clazz.getSimpleName() + " with #["
					+ value + "] already exists");
		}
	}

	public void findDuplicateBySpec(Class<E> clazz, E newEntity,
			Specification<E> specification) {
		List<E> entities = baseRepository.findAll(specification);

		if (entities != null && !entities.isEmpty()) {
			E otherEntity = entities.get(0);

			if (!otherEntity.equals(newEntity)) {
				throw new RuntimeException("Duplicate entry for "
						+ clazz.getSimpleName() + ".");
			}
		}
	}
}
