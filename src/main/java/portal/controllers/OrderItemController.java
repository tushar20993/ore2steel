package portal.controllers;

import java.util.List;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import portal.dao.OrderItemDao;
import portal.models.OrderItem;
import portal.models.PurchaseOrder;

@RestController
public class OrderItemController {

	private final Logger logger = (Logger) LoggerFactory.getLogger(OrderItemController.class);

	@Autowired
	private OrderItemDao orderItemDao;

	@Transactional
	@RequestMapping(value = "/order_item/save", method = RequestMethod.POST)
	public void saveOrderItems(@RequestBody List<OrderItem> newItems) {
		PurchaseOrder purchaseOrder = newItems.get(0).getOrderItemId().getPurchaseOrder();
		for (OrderItem item : newItems) {
			logger.info("Saving order Item {}", item);
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
