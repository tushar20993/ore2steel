package portal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.SiteDao;

@RestController
@RequestMapping(name = "/site")
public class SiteController {
	
	@Autowired
	private SiteDao siteDao;

}
