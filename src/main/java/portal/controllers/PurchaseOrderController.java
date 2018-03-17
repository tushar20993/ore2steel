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

import portal.dao.OrderItemDao;
import portal.dao.PurchaseOrderDao;
import portal.models.OrderItem;
import portal.models.PurchaseOrder;
import portal.models.Site;
import portal.models.constants.OrderStatuses;

@RestController
public class PurchaseOrderController {

	private static final Logger logger = (Logger) LoggerFactory.getLogger(PurchaseOrderController.class);
	
	@Autowired
	private PurchaseOrderDao purchaseOrderDao;

	@Autowired
	private OrderItemDao orderItemDao;

	@ResponseBody
	@RequestMapping(value = "/purchase_order/getAll", method = RequestMethod.GET)
	public List<PurchaseOrder> getAllPurchaseOrders() {
		logger.info("Fetching all purchase orders");
		return purchaseOrderDao.findAll();
	}

	@ResponseBody
	@RequestMapping(value = "/purchase_order/getBySite", method = RequestMethod.POST)
	public List<PurchaseOrder> getPurchaseOrderBySite(@RequestBody Site site) {
		logger.info("Fetching purchase orders for site {}", site);
		return purchaseOrderDao.findByPurchaseOrderIdSite(site);
	}

	@RequestMapping(value = "/purchase_order/save", method = RequestMethod.POST)
	public void savePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) throws Exception {
		boolean orderExists = purchaseOrderDao.findOne(purchaseOrder.getPurchaseOrderId()) != null;
		if (orderExists) {
			throw new Exception("Purchase order already exists");
		}
		logger.info("Saving new purchase order {}", purchaseOrder);
		backReferenceOrderItems(purchaseOrder);
		purchaseOrderDao.save(purchaseOrder);
	}

	private void backReferenceOrderItems(PurchaseOrder purchaseOrder) {
		for (OrderItem item : purchaseOrder.getItems()) {
			item.getOrderItemId().setPurchaseOrder(purchaseOrder);
		}

	}

	@RequestMapping(value = "/purchase_order/update", method = RequestMethod.POST)
	public void updatePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
		purchaseOrder.setItems(orderItemDao.findByOrderItemIdPurchaseOrder(purchaseOrder));
		logger.info("Updating purchase order {}", purchaseOrder);
		purchaseOrderDao.save(purchaseOrder);
	}

	@ResponseBody
	@RequestMapping(value = "/order_status/getAll", method = RequestMethod.GET)
	public List<String> getAllPurchaseOrderStatuses() {
		logger.info("Fetching all order statuses");
		return OrderStatuses.getAll();
	}

	@RequestMapping(value = "/purchase_order/delete", method = RequestMethod.POST)
	public void deletePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
		logger.info("Deleting purchase order {}", purchaseOrder);
		purchaseOrderDao.delete(purchaseOrderDao.findOne(purchaseOrder.getPurchaseOrderId()));
	}

}
