package portal.controllers;

import portal.dao.CompanyDao;
import portal.models.*;
import portal.models.constants.GSTRegistrationType;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompanyController {
	
	@Autowired
	private CompanyDao companyDao;
	
	@ResponseBody
	@RequestMapping(value = "/company/getCompanies", method = RequestMethod.GET)
	public List<Company> getCompanies(){
		return companyDao.findAll();
	}
	
	@ResponseBody
	@RequestMapping(value = "/registration/getAll", method = RequestMethod.GET)
	public List<String> getRegistrationStatuses(){
		return GSTRegistrationType.getRegistrationTypes();
	}
	
	@RequestMapping(value = "/company/update", method = RequestMethod.POST)
	public void updateCompany(Company company) {
			companyDao.save(company);
	}
	
	@RequestMapping(value = "/company/save", method = RequestMethod.POST)
	public void saveCompany(Company company) throws Exception{
		companyDao.save(company);
	}
	
}
