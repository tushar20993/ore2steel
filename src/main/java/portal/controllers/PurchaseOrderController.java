package portal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import portal.dao.PurchaseOrderDao;
import portal.models.PurchaseOrder;

@RestController
public class PurchaseOrderController {
	
	@Autowired
	private PurchaseOrderDao purchaseOrderDao;
	
	@ResponseBody
	@RequestMapping(value = "/purchase_order/getAll", method = RequestMethod.GET)
	public List<PurchaseOrder> getAllPurchaseOrders(){
		return purchaseOrderDao.findAll();
	}

	@RequestMapping(value = "/purchase_order/save", method = RequestMethod.POST)
	public void savePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
		purchaseOrderDao.save(purchaseOrder);
	}

}
