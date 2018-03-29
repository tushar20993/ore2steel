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

import portal.dao.InvoiceItemDao;
import portal.dao.ItemDao;
import portal.dao.OrderItemDao;
import portal.models.Item;
import portal.models.constants.ItemGroups;
import portal.models.constants.UOM;

@RestController
public class ItemController {

	private static final Logger logger = (Logger) LoggerFactory.getLogger(ItemController.class);
	
	@Autowired
	private ItemDao itemDao;
	
	@Autowired
	private OrderItemDao orderItemDao;
	
	@Autowired
	private InvoiceItemDao invoiceItemDao;

	@ResponseBody
	@RequestMapping(value = "/item/getAll", method = RequestMethod.GET)
	public List<Item> getAllItems() {
		logger.info("Fetching all items");
		return itemDao.findAll();
	}

	@ResponseBody
	@RequestMapping(value = "/item_group/getAll", method = RequestMethod.GET)
	public List<String> getAllItemGrroupss() {
		logger.info("Fetching all item groups");
		return ItemGroups.getAllGroups();
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

	@RequestMapping(value = "/item/delete", method = RequestMethod.POST)
	public void deleteItem(@RequestBody Item item) throws Exception {
		logger.info("Deleting item {}", item);
		
		int invoices = invoiceItemDao.countByItem(item);
		int pos = orderItemDao.countByItem(item);
		if( (invoices > 0) || (pos > 0) ) {
			throw new Exception("Item already in use. Please delete all uses");
		}
		
		itemDao.delete(item);
		
	}

}
