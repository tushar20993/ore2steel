package portal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.BrandDao;

@RestController
@RequestMapping("/brand")
public class BrandController {

	@Autowired
	private BrandDao brandDao;
}
