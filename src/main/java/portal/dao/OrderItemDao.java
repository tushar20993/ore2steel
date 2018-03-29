package portal.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.Item;
import portal.models.OrderItem;
import portal.models.PurchaseOrder;

public interface OrderItemDao extends JpaRepository<OrderItem, Integer> {

	public List<OrderItem> findByPurchaseOrder(PurchaseOrder purchaseOrder);

	public int countByItem(Item item);

}
