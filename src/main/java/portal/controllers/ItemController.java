package portal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.ItemDao;

@RestController
@RequestMapping(name = "/item")
public class ItemController {
	
	@Autowired
	private ItemDao itemDao;

}
