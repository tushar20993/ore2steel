package portal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.BrandDao;
import portal.models.Brand;
import portal.models.constants.BrandGroups;

@RestController
public class BrandController {

	@Autowired
	private BrandDao brandDao;

	@ResponseBody
	@RequestMapping(value = "/brand/getAll", method = RequestMethod.GET)
	public List<Brand> getAllBrands() {
		return brandDao.findAll();
	}

	@ResponseBody
	@RequestMapping(value = "/brand_group/getAll", method = RequestMethod.GET)
	public List<String> getAllBrandGroups() {
		return BrandGroups.getAllGroups();
	}

	@RequestMapping(value = "/brand/save", method = RequestMethod.POST)
	public void saveBrand(@RequestBody Brand brand) {
		brandDao.save(brand);
	}
}
