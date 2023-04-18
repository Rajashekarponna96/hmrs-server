package com.srmt.service.masters;

import com.srmt.model.hrms.administration.Language;
import com.srmt.service.GenericService;

public interface LanguageService extends GenericService<Language, Long> {

	void add(Language language);

	void update(Long id, Language language) throws Exception;

	void delete(Long id);
	
}
