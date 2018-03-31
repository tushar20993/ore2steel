package portal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	
	private static final Logger logger = (Logger) LoggerFactory.getLogger(BrandController.class);

	@Autowired
	private BrandDao brandDao;

	@ResponseBody
	@RequestMapping(value = "/brand/getAll", method = RequestMethod.GET)
	public List<Brand> getAllBrands() {
		logger.info("Fetching all brands");
		return brandDao.findAll();
	}

	@ResponseBody
	@RequestMapping(value = "/brand_group/getAll", method = RequestMethod.GET)
	public List<String> getAllBrandGroups() {
		return BrandGroups.getAllGroups();
	}

	@RequestMapping(value = "/brand/save", method = RequestMethod.POST)
	public void saveBrand(@RequestBody Brand brand) {
		logger.info("Saving new brand {}", brand);
		brandDao.save(brand);
	}
	
	@RequestMapping(value = "/brand/update", method = RequestMethod.POST)
	public void updateBrand(@RequestBody Brand brand) {
		logger.info("Updating brand {}", brand);
		brandDao.save(brand);
	}
	
	@RequestMapping(value = "/brand/delete", method = RequestMethod.POST)
	public void deleteBrand(@RequestBody Brand brand) {
		logger.info("Deleting brand {}", brand);
		brandDao.delete(brand);
	}
}
