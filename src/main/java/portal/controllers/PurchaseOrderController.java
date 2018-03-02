package portal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.PurchaseOrderDao;

@RestController
@RequestMapping(name = "/purchase_order")
public class PurchaseOrderController {
	
	@Autowired
	private PurchaseOrderDao purchaseOrderDao;

}
