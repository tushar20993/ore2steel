package portal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import portal.dao.PurchaseOrderDao;
import portal.models.PurchaseOrder;
import portal.models.constants.OrderStatuses;

@RestController
public class PurchaseOrderController {
	
	private Logger logger = (Logger)LoggerFactory.getLogger(PurchaseOrderController.class);
	
	@Autowired
	private PurchaseOrderDao purchaseOrderDao;
	
	@ResponseBody
	@RequestMapping(value = "/purchase_order/getAll", method = RequestMethod.GET)
	public List<PurchaseOrder> getAllPurchaseOrders(){
		return purchaseOrderDao.findAll();
	}

	@RequestMapping(value = "/purchase_order/save", method = RequestMethod.POST)
	public void savePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder/*, @RequestParam MultipartFile file*/) throws Exception{
		//logger.info("{}", file);
		boolean orderExists = purchaseOrderDao.findOne(purchaseOrder.getPurchaseOrderId()) != null;
		if(orderExists) {
			throw new Exception("Purchase order already exists");
		}
		purchaseOrderDao.save(purchaseOrder);
	}
	
	@RequestMapping(value = "/purchase_order/update", method = RequestMethod.POST)
	public void updatePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder/*, @RequestParam MultipartFile file*/) throws Exception{
		//logger.info("{}", file);
		//logger.info("Updating purchase order: {}", purchaseOrder);
		purchaseOrderDao.save(purchaseOrder);
	}
	
	@ResponseBody
	@RequestMapping(value = "/order_status/getAll", method = RequestMethod.GET)
	public List<String> getAllPurchaseOrderStatuses(){
		return OrderStatuses.getAll();
	}

}
