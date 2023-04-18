package com.srmt.rest.model;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
public @interface EntityValidator {

	String requestMethod();

	ValidationMethod validationMethod() default ValidationMethod.PRE;

	ValidationType type();

	String property() default "";
	
	String specFactoryMethod() default "";
}
