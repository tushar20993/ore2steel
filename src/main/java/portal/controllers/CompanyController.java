package portal.controllers;

import portal.dao.CompanyDao;
import portal.models.*;
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
	
	
}
