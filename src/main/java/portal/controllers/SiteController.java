package portal.controllers;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.PurchaseOrderDao;
import portal.dao.SiteDao;
import portal.models.Site;

@RestController
public class SiteController {
	
	private static final Logger logger = (Logger) LoggerFactory.getLogger(SiteController.class);

	@Autowired
	private SiteDao siteDao;

	@Autowired
	private PurchaseOrderDao purchaseOrderDao;

	@ResponseBody
	@RequestMapping(value = "/site/getAll", method = RequestMethod.GET)
	public List<Site> getAllSites() {
		logger.info("Fetching all sites");
		return siteDao.findAll();
	}

	@RequestMapping(value = "/site/update", method = RequestMethod.POST)
	public void updateSite(@RequestBody Site site) {
		site.setPurchaseOrders(purchaseOrderDao.findByPurchaseOrderIdSite(site));
		siteDao.save(site);
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

	@ResponseBody
	@RequestMapping(value = "/site/get", method = RequestMethod.GET)
	public List<Site> getSiteById(@RequestParam("id") Integer companyId) {
		return siteDao.findBySiteIdCompanyCompanyId(companyId);
	}

	@RequestMapping(value = "/site/delete", method = RequestMethod.POST)
	public void deleteSite(@RequestBody Site site) {
		siteDao.delete(site);
	}

}
