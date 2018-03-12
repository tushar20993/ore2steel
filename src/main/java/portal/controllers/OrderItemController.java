package portal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import portal.dao.OrderItemDao;
import portal.models.OrderItem;
import portal.models.PurchaseOrder;

@RestController
public class OrderItemController {
	
	@Autowired
	private OrderItemDao orderItemDao;
	
	@RequestMapping(value = "/order_item/delete", method = RequestMethod.GET)
	public void deleteOrderItem(@RequestBody OrderItem orderItem) {
		orderItemDao.delete(orderItem);
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/order_item/getFor", method = RequestMethod.POST)
	public List<OrderItem> findByPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
		return orderItemDao.findByOrderItemIdPurchaseOrder(purchaseOrder);
	}
	
}
