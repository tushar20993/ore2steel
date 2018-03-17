package portal.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import portal.models.OrderItem;
import portal.models.PurchaseOrder;
import portal.models.embeddables.OrderItemId;

public interface OrderItemDao extends JpaRepository<OrderItem, OrderItemId> {

	public List<OrderItem> findByOrderItemIdPurchaseOrder(PurchaseOrder purchaseOrder);

}
