package portal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.ItemDao;
import portal.models.Item;

@RestController
public class ItemController {
	
	@Autowired
	private ItemDao itemDao;
	
	@ResponseBody
	@RequestMapping(value = "/item/getAll", method = RequestMethod.GET)
	public List<Item> getAllItems(){
		return itemDao.findAll();
	}

}
