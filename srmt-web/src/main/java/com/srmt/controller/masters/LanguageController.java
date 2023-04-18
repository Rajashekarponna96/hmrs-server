package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.Language;
import com.srmt.service.masters.LanguageService;

@RestController
@RequestMapping("/language")
public class LanguageController {

	@Autowired
	private LanguageService languageService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody Language language) {
		languageService.add(language);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody Language language) throws Exception {
		languageService.update(id, language);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		languageService.delete(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Language> findByPageAndSize(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return languageService.findAll(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public long getCount() {
		return languageService.count();
	}

}
