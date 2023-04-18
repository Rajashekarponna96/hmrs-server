package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.BroadCastMessage;

public interface BroadCastMesageService {

	void add(BroadCastMessage broadCastMessageMaster);

	void update(Long id, BroadCastMessage broadCastMessageMaster);

	List<BroadCastMessage> findByPageAndSize(int page, int size);

	void deleteById(Long id);

	Long getCount();

	List<BroadCastMessage> searchBroadCasteMessage(String searchKey, int page, int size);

	int searchBroadCasteMessageCount(String searchKey);


	List<BroadCastMessage> findActiveBroadCastMessage();

}
