package portal.controllers;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.SiteDao;
import portal.models.Site;

@RestController
public class SiteController {
	
	@Autowired
	private SiteDao siteDao;
	
	
	@ResponseBody
	@RequestMapping(value = "/site/getAll", method = RequestMethod.GET)
	public List<Site> getAllSites(){
		return siteDao.findAll();
	}
	
	@RequestMapping(value = "/site/save", method = RequestMethod.POST)
	public void saveSite(@RequestBody Site site) {
		generateNewSiteId(site);
		siteDao.save(site);		
	}

	private void generateNewSiteId(Site site) {
		int numSites = siteDao.countBySiteIdCompanyCompanyId(site.getSiteId().getCompanyId());
		site.getSiteId().setSiteId(++numSites);
		
	}

}
