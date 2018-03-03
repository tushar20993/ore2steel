package portal.controllers;

import portal.dao.CompanyDao;
import portal.dao.SiteDao;
import portal.models.*;
import portal.models.constants.GSTRegistrationType;
import portal.models.embeddables.SiteId;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompanyController {
	
	@Autowired
	private CompanyDao companyDao;
	
	@Autowired
	private SiteDao siteDao;
	
	@ResponseBody
	@RequestMapping(value = "/company/getAll", method = RequestMethod.GET)
	public List<Company> getCompanies(){
		return companyDao.findAll();
	}
	
	@ResponseBody
	@RequestMapping(value = "/status/getAll", method = RequestMethod.GET)
	public List<String> getRegistrationStatuses(){
		return GSTRegistrationType.getRegistrationTypes();
	}
	
	@RequestMapping(value = "/company/update", method = RequestMethod.POST)
	public void updateCompany(Company company) {
			companyDao.save(company);
	}
	
	@RequestMapping(value = "/company/save", method = RequestMethod.POST)
	public void saveCompany(@RequestBody Company company) throws Exception{
		companyDao.save(company);
		saveHeadOffice(company);
	}
	
	public void saveHeadOffice(Company company) {
		Site site = new Site();
		site.setSiteId(new SiteId());
		site.getSiteId().setCompany(company);
		site.getSiteId().setSiteId(1);
		site.setSiteName("Head Office");
		site.setSiteAddress(company.getCompanyAddress());
		site.setRegistrationStatus(company.getRegistrationStatus());
		site.setGstNumber(company.getRegistrationStatus().equals(GSTRegistrationType.REGISTERED) ? company.getGstNumber() : "");
		site.setContactPerson(company.getContactPerson());
		site.setContactNumber(company.getContactNumber());
		siteDao.saveAndFlush(site);
	}
	
}
