package portal.controllers;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import portal.dao.OrderItemDao;
import portal.dao.PurchaseOrderDao;
import portal.models.OrderItem;
import portal.models.PurchaseOrder;
import portal.models.embeddables.PurchaseOrderId;

@RestController
@SuppressWarnings("unchecked")
public class OrderItemController {
	
	@Autowired
	private OrderItemDao orderItemDao;
	
	@Autowired
	private PurchaseOrderDao purchaseOrderDao;

	@Transactional
	@RequestMapping(value = "/order_item/save", method = RequestMethod.POST)
	public void saveOrderItems(@RequestBody Map<String, Object> data) {
		List<OrderItem> newItems = (List<OrderItem>) data.get("newItems");
		PurchaseOrderId purchaseOrderId = (PurchaseOrderId )data.get("purchaseOrderId");
		PurchaseOrder purchaseOrder = purchaseOrderDao.findOne(purchaseOrderId);
		for(OrderItem item: newItems) {
			item.getOrderItemId().setPurchaseOrder(purchaseOrder);
			orderItemDao.save(item);
		}
	}
	

	@RequestMapping(value = "/order_item/delete", method = RequestMethod.POST)
	public void deleteOrderItem(@RequestBody OrderItem orderItem) {
		orderItemDao.delete(orderItem);
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/order_item/getFor", method = RequestMethod.POST)
	public List<OrderItem> findByPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
		return orderItemDao.findByOrderItemIdPurchaseOrder(purchaseOrder);
	}
	
}
