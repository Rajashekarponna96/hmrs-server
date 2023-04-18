package com.srmt.rest.model;

import java.io.Serializable;

public interface IEntity<E extends IEntity<E> & Copyable<E>> extends Copyable<E>{

	<S extends Serializable> S getId();
}
