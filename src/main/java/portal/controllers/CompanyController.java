
package portal.controllers;

import portal.dao.CompanyDao;
import portal.dao.SiteDao;
import portal.models.*;
import portal.models.constants.GSTRegistrationType;
import portal.models.embeddables.SiteId;

import java.util.*;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompanyController {

	private static final Logger logger = (Logger) LoggerFactory.getLogger(CompanyController.class);

	private final String REGISTERED_OFFICE = "Registered Office";

	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private SiteDao siteDao;

	@ResponseBody
	@RequestMapping(value = "/company/getAll", method = RequestMethod.GET)
	public List<Company> getCompanies() {
		logger.info("Fetching all companies");
		return companyDao.findAll();
	}

	@ResponseBody
	@RequestMapping(value = "/status/getAll", method = RequestMethod.GET)
	public List<String> getRegistrationStatuses() {
		logger.info("Fetching all GST registration types");
		return GSTRegistrationType.getRegistrationTypes();
	}

	@RequestMapping(value = "/company/update", method = RequestMethod.POST)
	public void updateCompany(@RequestBody Company company) {
		logger.info("Updating company {}", company);
		company.setSites(siteDao.findBySiteIdCompanyCompanyId(company.getCompanyId()));
		companyDao.save(company);
	}

	@Transactional
	@RequestMapping(value = "/company/save", method = RequestMethod.POST)
	public void saveCompany(@RequestBody Company company) throws Exception {
		logger.info("Saving company {}", company);
		companyDao.save(company);
		saveRegisteredOffice(company);
	}

	@Transactional
	@RequestMapping(value = "/company/delete", method = RequestMethod.POST)
	public void deleteCompany(@RequestBody Company company) throws Exception {
		logger.info("Deleting company {}", company);
		companyDao.delete(companyDao.findOne(company.getCompanyId()));
	}

	public void saveRegisteredOffice(Company company) {
		Site site = new Site();
		site.setSiteId(new SiteId());
		site.getSiteId().setCompany(company);
		site.getSiteId().setSiteId(1);
		site.setSiteName(REGISTERED_OFFICE);
		site.setSiteAddress(company.getCompanyAddress());
		site.setStateCode(company.getStateCode());
		site.setPinCode(company.getPinCode());
		site.setRegistrationStatus(company.getRegistrationStatus());
		site.setGstNumber(company.getGstNumber());
		site.setSitePan(company.getCompanyPan());
		site.setContactPerson(company.getContactPerson());
		site.setContactNumber(company.getContactNumber());
		logger.info("Saving registered office for new company {}", site);
		siteDao.save(site);
	}

}
