package portal.controllers;

import java.util.List;

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

	@Autowired
	private PurchaseOrderDao purchaseOrderDao;

	@Autowired
	private OrderItemDao orderItemDao;

	@ResponseBody
	@RequestMapping(value = "/purchase_order/getAll", method = RequestMethod.GET)
	public List<PurchaseOrder> getAllPurchaseOrders() {
		return purchaseOrderDao.findAll();
	}

	@ResponseBody
	@RequestMapping(value = "/purchase_order/getBySite", method = RequestMethod.POST)
	public List<PurchaseOrder> getPurchaseOrderBySite(@RequestBody Site site) {
		return purchaseOrderDao.findByPurchaseOrderIdSite(site);
	}

	@RequestMapping(value = "/purchase_order/save", method = RequestMethod.POST)
	public void savePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) throws Exception {
		boolean orderExists = purchaseOrderDao.findOne(purchaseOrder.getPurchaseOrderId()) != null;
		if (orderExists) {
			throw new Exception("Purchase order already exists");
		}
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
		purchaseOrderDao.save(purchaseOrder);
	}

	@ResponseBody
	@RequestMapping(value = "/order_status/getAll", method = RequestMethod.GET)
	public List<String> getAllPurchaseOrderStatuses() {
		return OrderStatuses.getAll();
	}

	@RequestMapping(value = "/purchase_order/delete", method = RequestMethod.POST)
	public void deletePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
		purchaseOrderDao.delete(purchaseOrderDao.findOne(purchaseOrder.getPurchaseOrderId()));
	}

}
