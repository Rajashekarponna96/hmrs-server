package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.BroadCastMessage;
import com.srmt.service.masters.BroadCastMesageService;

@RestController
@RequestMapping("/broadcastMessage")
public class BroadCastMessageController {

	@Autowired
	private BroadCastMesageService broadCastMesageService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody BroadCastMessage broadCastMessageMaster) {
		broadCastMesageService.add(broadCastMessageMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody BroadCastMessage broadCastMessageMaster) {
		broadCastMesageService.update(id, broadCastMessageMaster);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<BroadCastMessage> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return broadCastMesageService.findByPageAndSize(page, size);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		broadCastMesageService.deleteById(id);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return broadCastMesageService.getCount();
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<BroadCastMessage> searchBroadCasteMessage(
			@RequestParam(value = "searchKey", required = false) String searchKey,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return broadCastMesageService.searchBroadCasteMessage(searchKey, page,
				size);
	}

	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int searchBroadCasteMessageCount(
			@RequestParam(value = "searchKey", required = false) String searchKey) {
		return broadCastMesageService.searchBroadCasteMessageCount(searchKey);
	}
	@RequestMapping(value="/activeMessage",method=RequestMethod.GET)
	public List<BroadCastMessage> findActiveBroadCastMessage(){
		return broadCastMesageService.findActiveBroadCastMessage();
	}

}
