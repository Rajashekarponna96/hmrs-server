package com.srmt.service.masters;

import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.Language;
import com.srmt.service.GenericServiceImpl;

@Service
public class LanguageServiceImpl extends GenericServiceImpl<Language, Long>
		implements LanguageService {

	public LanguageServiceImpl() {
		super(Language.class);
	}

	public void add(Language language) {
		super.add(
				Language.class,
				language.getCode(),
				genericSpecification.findByProperty("code", language.getCode()),
				language);
	}

	public void update(Long id, Language language) throws Exception {
		super.update(
				Language.class,
				id,
				genericSpecification.findByProperty("code", language.getCode()),
				language);
	}

	@Override
	public void delete(Long id) {
		super.delete(id);
	}

	@Override
	public long count() {
		return super.count();
	}
}
