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

import portal.dao.ItemDao;
import portal.models.Item;
import portal.models.constants.UOM;

@RestController
public class ItemController {
	
	private static final Logger logger = (Logger) LoggerFactory.getLogger(ItemController.class);

	@Autowired
	private ItemDao itemDao;

	@ResponseBody
	@RequestMapping(value = "/item/getAll", method = RequestMethod.GET)
	public List<Item> getAllItems() {
		logger.info("Fetching all items");
		return itemDao.findAll();
	}

	@ResponseBody
	@RequestMapping(value = "/item/getAllUnits", method = RequestMethod.GET)
	public List<String> getAllUnits() {
		logger.info("Fetching all units of measurement");
		return UOM.getAllUnits();
	}

	@RequestMapping(value = "/item/save", method = RequestMethod.POST)
	public void saveItem(@RequestBody Item item) {
		logger.info("Saving new item {}", item);
		itemDao.save(item);
	}

}
